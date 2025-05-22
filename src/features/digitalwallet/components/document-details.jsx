"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Trash2, X, Calendar, CreditCard, FileText } from "lucide-react";

export function DocumentDetails({ document, onDelete, onCancel }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Document Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="aspect-video relative bg-gray-100 rounded-md overflow-hidden">
            {document.document_image ? (
              <img
                src={document.document_image || "/placeholder.svg"}
                alt={document.document_name}
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
              <p className="mt-1">{document.document_name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Document Type
              </h3>
              <p className="mt-1">{document.document_type}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Document Number
              </h3>
              <div className="flex items-center mt-1">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                <span>{document.document_number}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  {document?.expiry_date
                    ? new Date(document.expiry_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "N/A"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Date Added</h3>
              <p className="mt-1">
                {new Date(document.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="destructive" onClick={() => setIsAlertOpen(true)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Close
        </Button>

        {isAlertOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone. This will permanently delete the
                document.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAlertOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete(document._id);
                    setIsAlertOpen(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
