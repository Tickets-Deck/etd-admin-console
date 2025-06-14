import { CalendarCheck, CreditCard, DollarSign, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import { ValueOf } from "next/dist/shared/lib/constants";
import Link from "next/link";

interface QuickAccessCardProps {
  icon: string;
  title: string;
  color: string;
  url: ValueOf<typeof ApplicationRoutes>;
}

export default function QuickAccessCard({
  icon,
  title,
  color,
  url,
}: QuickAccessCardProps) {
  return (
    <Link href={url} className="no-underline">
      <Card className="p-4 bg-muted hover:bg-muted/50 cursor-pointer transition-colors shadow-none rounded-2xl group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                color === "blue" ? "bg-primary group-hover:bg-primary/10" : ""
              )}
            >
              {icon == "events" && (
                <CalendarCheck className="h-4 w-4 text-blue-100 group-hover:text-primary" />
              )}
              {icon == "users" && (
                <Users className="h-4 w-4 text-blue-100 group-hover:text-primary" />
              )}
              {icon == "credit-card" && (
                <CreditCard className="h-4 w-4 text-blue-100 group-hover:text-primary" />
              )}
              {icon == "payouts" && (
                <DollarSign className="h-4 w-4 text-blue-100 group-hover:text-primary" />
              )}
            </div>
            <span className="font-medium">{title}</span>
          </div>
          <div className="text-muted-foreground">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
