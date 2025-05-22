import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DocumentCard } from "../components/document-card";
import { UploadDocument } from "../components/upload-document";
import { DocumentDetails } from "../components/document-details";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export function Wallet() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/citizen/digital-document-list/${citizenId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (citizenId && token) {
      fetchDocuments();
    }
  }, [citizenId, token]);

  const handleDeleteDocument = async (documentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/citizen/delete-document/${documentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      fetchDocuments();
      setSelectedDocument(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  const handleSelectDocument = (document) => {
    setSelectedDocument(document);
    setIsEditMode(false);
  };

  const handleCloseDetails = () => {
    setSelectedDocument(null);
  };

  if (loading) {
    return <div className="text-center py-10">Loading documents...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => {
              setIsUploadOpen(true);
              setSelectedDocument(null);
            }}
            className="ml-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          {selectedDocument ? (
            <DocumentDetails
              document={selectedDocument}
              isEditMode={isEditMode}
              onEdit={() => setIsEditMode(true)}
              onUpdate={(updatedDoc) => {
                setDocuments(
                  documents.map((doc) =>
                    doc.id === updatedDoc.id ? updatedDoc : doc
                  )
                );
                setSelectedDocument(updatedDoc);
                setIsEditMode(false);
              }}
              onDelete={handleDeleteDocument}
              onCancel={handleCloseDetails}
            />
          ) : (
            <DocumentGrid
              documents={documents}
              onSelect={handleSelectDocument}
            />
          )}
        </TabsContent>
      </Tabs>

      <UploadDocument
        onCancel={() => setIsUploadOpen(false)}
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
}

function DocumentGrid({ documents, onSelect }) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No documents found. Click "Add Document" to upload your first document.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id || doc._id}
          document={doc}
          onClick={() => onSelect(doc)}
        />
      ))}
    </div>
  );
}
