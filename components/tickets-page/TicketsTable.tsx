"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const mockTickets = [
  {
    id: "1",
    name: "VIP Ticket",
    eventName: "Music Fest 2024",
    price: 5000,
    quantity: 100,
    remainingTickets: 40,
    visibility: true,
  },
  {
    id: "2",
    name: "Regular Ticket",
    eventName: "Music Fest 2024",
    price: 2000,
    quantity: 200,
    remainingTickets: 123,
    visibility: false,
  },
];

export const TicketsTable = () => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.eventName}</TableCell>
              <TableCell>₦{ticket.price}</TableCell>
              <TableCell>{ticket.quantity}</TableCell>
              <TableCell>{ticket.remainingTickets}</TableCell>
              <TableCell>
                <Switch checked={ticket.visibility} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};