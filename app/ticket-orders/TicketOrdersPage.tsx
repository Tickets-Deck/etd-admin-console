"use client"
import { TicketOrdersTable } from '@/components/ticket-orders-page/TicketOrdersTable'
import { ViewTicketModal } from '@/components/tickets-page/ViewTicketsModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'

interface Ticket {
  id: string;
  ticketId: string;
  eventName: string;
  userName: string;
  userEmail: string;
  purchaseDate: string;
  status: "valid" | "used" | "refunded" | "cancelled";
  price: number;
}

type Props = {}

export default function TicketOrdersPage({}: Props) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ticket Orders</h1>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search tickets..." className="max-w-sm" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="valid">Valid</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filter</Button>
      </div>
      <TicketOrdersTable onViewTicket={handleViewTicket} />

      {selectedTicket && (
        <ViewTicketModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          ticket={selectedTicket}
        />
      )}
    </div>
  )
}