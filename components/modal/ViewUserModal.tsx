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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types/user"

interface ViewUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "organizer":
        return <Badge className="bg-blue-500">Organizer</Badge>
      case "user":
        return <Badge variant="outline">User</Badge>
      default:
        return <Badge variant="outline">User</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-500 text-white">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-500 text-white">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Detailed information about the user.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            {getRoleBadge(user.role)}
            {getStatusBadge(user.status)}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Joined Date</div>
            <div>{user.joinedDate}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Tickets Purchased</div>
            <div>{user.ticketsPurchased}</div>
          </div>
          {user.phone && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Phone</div>
              <div>{user.phone}</div>
            </div>
          )}
          {user.address && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Address</div>
              <div>{user.address}</div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
