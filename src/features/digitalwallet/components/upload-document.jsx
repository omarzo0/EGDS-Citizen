import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Modal from "@mui/material/Modal";
import { Select, SelectItem } from "../components/ui/select";
import { Upload, X } from "lucide-react";

export function UploadDocument({ onCancel, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    document_name: "",
    document_type: "",
    document_number: "",
    issue_date: "",
    expiry_date: "",
    document_image: null,
    previewImage: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);

      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          document_image: reader.result.split(",")[1], // Get only the base64 part
          previewImage: previewUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      document_image: null,
      previewImage: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form
      if (
        !formData.document_name ||
        !formData.document_type ||
        !formData.document_number ||
        !formData.expiry_date ||
        !formData.document_image
      ) {
        throw new Error("Please fill all required fields");
      }

      // Validate authentication
      if (!citizenId || !token) {
        throw new Error("Authentication required. Please log in again.");
      }

      // Prepare the payload
      const payload = {
        document_name: formData.document_name,
        document_type: formData.document_type,
        document_number: formData.document_number,
        issue_date:
          formData.issue_date || new Date().toISOString().split("T")[0],
        expiry_date: formData.expiry_date,
        document_image: formData.document_image,
        citizen_id: citizenId, // Include citizenId in the payload
      };

      // Make API call
      const response = await fetch(
        "http://localhost:5000/api/citizen/digital-document",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload document");
      }

      const result = await response.json();
      console.log("Document uploaded successfully:", result);

      // Close modal and reset form on success
      onClose();
      setFormData({
        document_name: "",
        document_type: "",
        document_number: "",
        issue_date: "",
        expiry_date: "",
        document_image: null,
        previewImage: null,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-6 w-[500px] bg-white p-6 rounded-lg shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Add New Document</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="document_name">Document Name</Label>
                <Input
                  id="document_name"
                  value={formData.document_name}
                  onChange={handleInputChange}
                  placeholder="e.g. My National ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document_type">Document Type</Label>
                <select
                  id="document_type"
                  value={formData.document_type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      document_type: e.target.value,
                    }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select document type</option>
                  <option value="National ID">National ID</option>
                  <option value="Driver License">Driver License</option>
                  <option value="Passport">Passport</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document_number">Document Number</Label>
                <Input
                  id="document_number"
                  value={formData.document_number}
                  onChange={handleInputChange}
                  placeholder="e.g. ID12345678"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue_date">Issue Date (optional)</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={formData.issue_date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Document Image</Label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  {formData.previewImage ? (
                    <div className="relative w-full">
                      <div className="flex items-center justify-between border rounded-md p-2">
                        <img
                          src={formData.previewImage}
                          alt="Document preview"
                          className="h-20 object-contain"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document Image
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Uploading..." : "Add Document"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Modal>
  );
}
