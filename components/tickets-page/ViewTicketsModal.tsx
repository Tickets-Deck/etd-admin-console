"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode } from "lucide-react"

interface Ticket {
  id: string
  ticketId: string
  eventName: string
  userName: string
  userEmail: string
  purchaseDate: string
  status: "valid" | "used" | "refunded" | "cancelled"
  price: number
}

interface ViewTicketModalProps {
  isOpen: boolean
  onClose: () => void
  ticket: Ticket
}

export function ViewTicketModal({ isOpen, onClose, ticket }: ViewTicketModalProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
          <DialogDescription>Information about ticket {ticket.ticketId}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed p-4">
            <QrCode className="h-full w-full text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">{ticket.eventName}</h3>
            <div className="mt-2">{getStatusBadge(ticket.status)}</div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Ticket ID</div>
            <div>{ticket.ticketId}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Purchased By</div>
            <div>{ticket.userName}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Email</div>
            <div>{ticket.userEmail}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Purchase Date</div>
            <div>{ticket.purchaseDate}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Price</div>
            <div>₦{ticket.price.toLocaleString()}</div>
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {ticket.status === "valid" && <Button>Mark as Used</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
