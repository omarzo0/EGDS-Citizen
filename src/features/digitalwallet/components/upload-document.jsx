"use client";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
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

import { Upload, X } from "lucide-react";

export function UploadDocument({ onUpload, onCancel }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type || !documentNumber || !expiryDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newDocument = {
      id: uuidv4(),
      name,
      type,
      documentNumber,
      expiryDate,
      file,
      dateAdded: new Date().toISOString(),
    };

    onUpload(newDocument);
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
          <CardTitle>Add New Document</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Document Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My National ID"
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
            <Label htmlFor="documentNumber">Document Number</Label>
            <Input
              id="documentNumber"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="e.g. ID12345678"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Document</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
