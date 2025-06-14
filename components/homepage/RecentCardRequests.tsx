"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const data = [
  { branch: "Corporate", cardType: "Instant", quantity: 10, status: "Ready" },
  { branch: "Corporate", cardType: "Personalized", quantity: 10, status: "In Progress" },
  { branch: "Corporate", cardType: "Personalized", quantity: 10, status: "Authenticated" },
  { branch: "Corporate", cardType: "Instant", quantity: 10, status: "Pending" },
]

export default function RecentCardRequests() {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-[100px]">Branch</TableHead>
            <TableHead>Card Type</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-xs">{item.branch}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-normal",
                    item.cardType === "Instant"
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-purple-200 bg-purple-50 text-purple-700",
                  )}
                >
                  {item.cardType}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-normal",
                    item.status === "Ready"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : item.status === "In Progress"
                        ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                        : item.status === "Authenticated"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-gray-50 text-gray-700",
                  )}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="link" className="text-blue-600 h-auto p-0 font-semibold text-xs">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
