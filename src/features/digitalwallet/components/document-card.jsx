import { Card, CardContent } from "../components/ui/card";
import { FileText, CreditCard, Calendar } from "lucide-react";
import { cn } from "../../../lib/utils";

export function DocumentCard({ document, onClick, isSelected }) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md overflow-hidden",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="relative h-40 bg-gray-100">
        {document.file ? (
          <img
            src={
              URL.createObjectURL(document.document_image) || "/placeholder.svg"
            }
            alt={document.document_name}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
          {document.document_type}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{document.document_name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <CreditCard className="h-3.5 w-3.5 mr-1" />
          <span className="truncate">{document.document_number}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>
            Expires:{" "}
            {document?.expiry_date
              ? new Date(document.expiry_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
