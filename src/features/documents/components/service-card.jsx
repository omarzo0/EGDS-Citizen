import { Link } from "react-router-dom";
import {
  Plane,
  FileText,
  Car,
  CreditCard,
  Heart,
  Home,
  UserPlus,
  RefreshCw,
  FileDiffIcon as FileReplace,
  FileEdit,
  Zap,
  HeartHandshake,
  Receipt,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/ui/card";
import { Button } from "../../../lib/ui/button";
import { Badge } from "../../../lib/ui/badge";

export default function ServiceCard({
  name,
  description,
  icon,
  href,
  department,
  serviceId,
}) {
  const IconMap = {
    Plane,
    FileText,
    Car,
    CreditCard,
    Heart,
    Home,
    UserPlus,
    RefreshCw,
    FileReplace,
    FileEdit,
    Zap,
    HeartHandshake,
    Receipt,
  };

  const Icon = IconMap[icon] || FileText;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="text-xs">
          {department}
        </Badge>
      </CardContent>
      <CardFooter>
        <Link to={`/app/book/${serviceId}`} className="w-full">
          <Button variant="outline" className="w-full">
            Book Appointment
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
