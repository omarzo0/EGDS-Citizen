"use client";

import { useState } from "react";
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

  const addDocument = (document) => {
    setDocuments([...documents, document]);
    setIsUploadOpen(false);
  };

  const updateDocument = (updatedDoc) => {
    setDocuments(
      documents.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc))
    );
    setSelectedDocument(updatedDoc);
    setIsEditMode(false);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    setSelectedDocument(null);
  };

  const handleSelectDocument = (document) => {
    setSelectedDocument(document);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="ids">IDs</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
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
          <DocumentGrid
            documents={documents}
            onSelect={handleSelectDocument}
            selectedId={selectedDocument?.id}
          />
        </TabsContent>

        <TabsContent value="ids" className="mt-0">
          <DocumentGrid
            documents={documents.filter((doc) => doc.type === "National ID")}
            onSelect={handleSelectDocument}
            selectedId={selectedDocument?.id}
          />
        </TabsContent>

        <TabsContent value="licenses" className="mt-0">
          <DocumentGrid
            documents={documents.filter((doc) => doc.type === "Driver License")}
            onSelect={handleSelectDocument}
            selectedId={selectedDocument?.id}
          />
        </TabsContent>
      </Tabs>

      {isUploadOpen && (
        <UploadDocument
          onUpload={addDocument}
          onCancel={() => setIsUploadOpen(false)}
        />
      )}

      {selectedDocument && !isUploadOpen && (
        <DocumentDetails
          document={selectedDocument}
          isEditMode={isEditMode}
          onEdit={() => setIsEditMode(true)}
          onUpdate={updateDocument}
          onDelete={deleteDocument}
          onCancel={() => {
            setIsEditMode(false);
            setSelectedDocument(null);
          }}
        />
      )}

      {documents.length === 0 && !isUploadOpen && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No documents yet</h3>
          <p className="text-gray-500 mb-4">
            Add your first document to get started
          </p>
          <Button onClick={() => setIsUploadOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </div>
      )}
    </div>
  );
}

function DocumentGrid({ documents, onSelect, selectedId }) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No documents in this category
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onClick={() => onSelect(doc)}
          isSelected={doc.id === selectedId}
        />
      ))}
    </div>
  );
}
