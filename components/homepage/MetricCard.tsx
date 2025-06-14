import {
  CreditCard,
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CalendarCheck,
  User,
  Users,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string;
  change?: string;
  period?: string;
  trend?: "up" | "down";
  alert?: string;
  color: string;
  isLoading?: boolean;
}

export default function MetricCard({
  icon,
  title,
  value,
  change,
  period,
  trend,
  alert,
  color,
  isLoading,
}: MetricCardProps) {
  return (
    <>
      {isLoading ? (
        <Card className="p-4 h-fit shadow-none animate-pulse">
          <div className="flex flex-row justify-between items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{title}</span>
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                color === "blue" ? "bg-primary/10" : ""
              )}
            >
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-3xl font-bold mb-2 bg-gray-200 w-[60%] h-7 rounded"></div>
            {change && (
              <div className="flex flex-row items-center gap-1">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 mb-1">Loading...</span>
              </div>
            )}
          </div>
          {alert && <div className="text-xs text-orange-500 mt-1">{alert}</div>}
        </Card>
      ) : (
        <Card className="p-4 h-fit shadow-none">
          <div className="flex flex-row justify-between items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{title}</span>
            {icon === "credit-card" && (
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  color === "blue" ? "bg-primary/10" : ""
                )}
              >
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
            )}
            {icon === "active-event" && (
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  color === "blue" ? "bg-primary/10" : ""
                )}
              >
                <CalendarCheck className="h-4 w-4 text-primary" />
              </div>
            )}
            {icon === "event" && (
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  color === "blue" ? "bg-primary/10" : ""
                )}
              >
                <Calendar className="h-4 w-4 text-primary" />
              </div>
            )}
            {icon === "dollar-sign" && (
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  color === "blue" ? "bg-primary/10" : ""
                )}
              >
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            )}
            {icon === "users" && (
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  color === "orange" ? "bg-primary/10" : ""
                )}
              >
                <Users className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-start">
            <div className="text-3xl font-bold mb-1">{value}</div>
            {change && (
              <div className="flex flex-row items-center gap-1">
                {trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : null}
                <span
                  className={cn(
                    "text-sm",
                    trend === "up"
                      ? "text-green-500"
                      : trend === "down"
                      ? "text-red-500"
                      : ""
                  )}
                >
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">{period}</span>
              </div>
            )}
          </div>
          {/* {alert && <div className="text-xs text-orange-500 mt-1">{alert}</div>} */}
        </Card>
      )}
    </>
  );
}
