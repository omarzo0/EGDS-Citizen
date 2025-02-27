"use client";

import { useState } from "react";
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
import { Select, SelectItem } from "../components/ui/select";

import {
  Edit,
  Trash2,
  X,
  Calendar,
  CreditCard,
  FileText,
  Upload,
} from "lucide-react";

export function DocumentDetails({
  document,
  isEditMode,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const [name, setName] = useState(document.name);
  const [type, setType] = useState(document.type);
  const [documentNumber, setDocumentNumber] = useState(document.documentNumber);
  const [expiryDate, setExpiryDate] = useState(document.expiryDate);
  const [file, setFile] = useState(document.file);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleUpdate = () => {
    const updatedDocument = {
      ...document,
      name,
      type,
      documentNumber,
      expiryDate,
      file,
    };
    onUpdate(updatedDocument);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {isEditMode ? "Edit Document" : "Document Details"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditMode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Document Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type">Document Type</Label>
              <Select
                id="edit-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <SelectItem value="select">Select document type</SelectItem>
                <SelectItem value="National ID">National ID</SelectItem>
                <SelectItem value="Driver License">Driver License</SelectItem>
                <SelectItem value="Passport">Passport</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-documentNumber">Document Number</Label>
              <Input
                id="edit-documentNumber"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-expiryDate">Expiry Date</Label>
              <Input
                id="edit-expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-file">Document Image</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="edit-file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {file ? (
                  <div className="relative w-full">
                    <div className="flex items-center justify-between border rounded-md p-2">
                      <span className="truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
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
                    onClick={() =>
                      document.getElementById("edit-file")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document Image
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="aspect-video relative bg-gray-100 rounded-md overflow-hidden">
              {file ? (
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={document.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Document Name
                </h3>
                <p className="mt-1">{document.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Document Type
                </h3>
                <p className="mt-1">{document.type}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Document Number
                </h3>
                <div className="flex items-center mt-1">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{document.documentNumber}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Expiry Date
                </h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{document.expiryDate}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Date Added
                </h3>
                <p className="mt-1">
                  {new Date(document.dateAdded).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        {isEditMode ? (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsAlertOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              {isAlertOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure?
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      This action cannot be undone. This will permanently delete
                      the document.
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAlertOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          onDelete(document.id);
                          setIsAlertOpen(false);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button variant="outline" onClick={onCancel}>
              Close
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
