import { Link } from "react-router-dom";
import { FileText, Plane, CreditCard, Car, Receipt, Home } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/ui/card";
import { Button } from "../../../lib/ui/button";

export default function DepartmentCard({
  title,
  description,
  icon,
  href,
  color,
  iconColor,
  departmentId,
}) {
  const IconMap = {
    FileText,
    Plane,
    CreditCard,
    Car,
    Receipt,
    Home,
  };

  const Icon = IconMap[icon] || FileText;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className={`rounded-t-lg ${color}`}>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-700">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-6">
        <Link to={`/app/departments`} className="w-full">
          <Button variant="outline" className="w-full">
            View Services
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
