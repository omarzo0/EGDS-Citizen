import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { CreditCard, Calendar } from "lucide-react";
import { cn } from "../../../lib/utils";

function Digitalwallet({ document, onClick, isSelected }) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md overflow-hidden",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent>
        <div className="relative h-40 bg-gray-100 flex justify-center items-center">
          <img
            src="/nationalid.jpeg"
            alt={document?.name || "National ID"}
            className="w-[200px] h-auto object-contain"
          />
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            National ID
          </div>
        </div>

        <CardContent>
          <Typography variant="h6" className="font-medium truncate">
            {document?.name}
          </Typography>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <CreditCard className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">1212</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>Expires: 20/5/2029</span>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Digitalwallet;
