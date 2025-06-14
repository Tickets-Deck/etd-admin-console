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
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types/user"

interface UsersTableProps {
  onViewUser: (user: User) => void
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
}

export function UsersTable({ onViewUser, onEditUser, onDeleteUser }: UsersTableProps) {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      status: "active",
      joinedDate: "Jan 12, 2023",
      ticketsPurchased: 5,
      phone: "+234 812 345 6789",
      address: "123 Main Street, Lagos",
    },
    {
      id: "2",
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      role: "organizer",
      status: "active",
      joinedDate: "Feb 3, 2023",
      ticketsPurchased: 2,
      phone: "+234 809 876 5432",
      address: "456 Park Avenue, Abuja",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      role: "user",
      status: "inactive",
      joinedDate: "Mar 15, 2023",
      ticketsPurchased: 0,
      phone: "+234 701 234 5678",
    },
    {
      id: "4",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      role: "admin",
      status: "active",
      joinedDate: "Dec 5, 2022",
      ticketsPurchased: 8,
      phone: "+234 803 987 6543",
      address: "789 Ocean Drive, Port Harcourt",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.w@example.com",
      role: "user",
      status: "active",
      joinedDate: "Apr 1, 2023",
      ticketsPurchased: 3,
      phone: "+234 908 765 4321",
    },
  ])

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead className="text-right">Tickets Purchased</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>{user.joinedDate}</TableCell>
              <TableCell className="text-right">{user.ticketsPurchased}</TableCell>
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
                    <DropdownMenuItem onClick={() => onViewUser(user)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditUser(user)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={() => onDeleteUser(user)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
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
