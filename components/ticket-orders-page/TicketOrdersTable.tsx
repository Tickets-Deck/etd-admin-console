"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Ban, Eye, TicketCheck } from "lucide-react"

type TicketOrders = {
  id: string
  ticketId: string
  eventName: string
  userName: string
  userEmail: string
  purchaseDate: string
  status: "valid" | "used" | "refunded" | "cancelled"
  price: number
}

interface TicketOrdersTableProps {
  onViewTicket?: (ticket: TicketOrders) => void
}

export function TicketOrdersTable({ onViewTicket }: TicketOrdersTableProps) {
  const [tickets] = useState<TicketOrders[]>([
    {
      id: "1",
      ticketId: "TKT-12345",
      eventName: "The Ultimate 2-Hour Boat Cruise",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      purchaseDate: "Apr 5, 2023",
      status: "valid",
      price: 5000,
    },
    {
      id: "2",
      ticketId: "TKT-12346",
      eventName: "The Ultimate 2-Hour Boat Cruise",
      userName: "Sarah Davis",
      userEmail: "sarah.davis@example.com",
      purchaseDate: "Apr 6, 2023",
      status: "valid",
      price: 5000,
    },
    {
      id: "3",
      ticketId: "TKT-12347",
      eventName: "The Ginger Experience",
      userName: "Michael Johnson",
      userEmail: "michael.j@example.com",
      purchaseDate: "Apr 7, 2023",
      status: "cancelled",
      price: 5000,
    },
    {
      id: "4",
      ticketId: "TKT-12348",
      eventName: "Shabamola Fest All White Party",
      userName: "Lisa Anderson",
      userEmail: "lisa.a@example.com",
      purchaseDate: "Apr 8, 2023",
      status: "valid",
      price: 5000,
    },
    {
      id: "5",
      ticketId: "TKT-12349",
      eventName: "Afrobeats Night",
      userName: "Robert Wilson",
      userEmail: "robert.w@example.com",
      purchaseDate: "Mar 10, 2023",
      status: "used",
      price: 5000,
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-500">Valid</Badge>
      case "used":
        return <Badge className="bg-blue-500">Used</Badge>
      case "refunded":
        return <Badge className="bg-yellow-500">Refunded</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.ticketId}</TableCell>
              <TableCell>{ticket.eventName}</TableCell>
              <TableCell>
                <div>
                  <p>{ticket.userName}</p>
                  <p className="text-sm text-muted-foreground">{ticket.userEmail}</p>
                </div>
              </TableCell>
              <TableCell>{ticket.purchaseDate}</TableCell>
              <TableCell>{getStatusBadge(ticket.status)}</TableCell>
              <TableCell className="text-right">₦{ticket.price.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewTicket?.(ticket)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    {ticket.status === "valid" && (
                      <DropdownMenuItem>
                        <TicketCheck className="mr-2 h-4 w-4" />
                        <span>Mark as Used</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {ticket.status === "valid" && (
                      <DropdownMenuItem className="text-red-500">
                        <Ban className="mr-2 h-4 w-4" />
                        <span>Cancel Ticket</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
