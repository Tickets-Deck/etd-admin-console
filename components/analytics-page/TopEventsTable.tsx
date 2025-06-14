"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type TopEvent = {
  id: string;
  name: string;
  date: string;
  ticketsSold: number;
  revenue: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
};

export function TopEventsTable() {
  const events: TopEvent[] = [
    {
      id: "1",
      name: "Afrobeats Night",
      date: "Mar 15, 2023",
      ticketsSold: 450,
      revenue: 2250000,
      status: "completed",
    },
    {
      id: "2",
      name: "Lagos Tech Conference",
      date: "May 5, 2023",
      ticketsSold: 320,
      revenue: 1600000,
      status: "upcoming",
    },
    {
      id: "3",
      name: "Shabamola Fest All White Party",
      date: "Apr 19, 2023",
      ticketsSold: 210,
      revenue: 1050000,
      status: "upcoming",
    },
    {
      id: "4",
      name: "The Ultimate 2-Hour Boat Cruise",
      date: "Apr 12, 2023",
      ticketsSold: 120,
      revenue: 600000,
      status: "upcoming",
    },
    {
      id: "5",
      name: "The Ginger Experience",
      date: "Apr 18, 2023",
      ticketsSold: 85,
      revenue: 425000,
      status: "upcoming",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "ongoing":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Tickets Sold</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(event.status)} text-white`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{event.ticketsSold}</TableCell>
              <TableCell className="text-right">
                ₦{event.revenue.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
