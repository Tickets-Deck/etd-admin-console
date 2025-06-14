"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const mockCoupons = [
  {
    id: "1",
    code: "NEWYEAR2025",
    discount: 500,
    maxUsage: 100,
    validUntil: "2025-01-15",
    event: "Music Fest 2025",
    isActive: true,
  },
  {
    id: "2",
    code: "GEN50OFF",
    discount: 50,
    maxUsage: 50,
    validUntil: "2024-12-31",
    event: "-",
    isActive: false,
  },
];

export const CouponsTable = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Max Usage</TableHead>
            <TableHead>Valid Until</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCoupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>₦{coupon.discount}</TableCell>
              <TableCell>{coupon.maxUsage}</TableCell>
              <TableCell>{coupon.validUntil}</TableCell>
              <TableCell>{coupon.event}</TableCell>
              <TableCell>
                <Badge variant={coupon.isActive ? "default" : "destructive"}>
                  {coupon.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedCoupon(coupon);
                  setShowDetails(true);
                }}>View</Button>
                <Button variant="destructive" size="sm">Deactivate</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Coupon Detail Modal */}
      <Dialog open={showDetails} onOpenChange={() => setShowDetails(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coupon Info</DialogTitle>
          </DialogHeader>
          {selectedCoupon && (
            <div className="space-y-2 text-sm">
              <p><strong>Code:</strong> {selectedCoupon.code}</p>
              <p><strong>Discount:</strong> ₦{selectedCoupon.discount}</p>
              <p><strong>Max Usage:</strong> {selectedCoupon.maxUsage}</p>
              <p><strong>Valid Until:</strong> {selectedCoupon.validUntil}</p>
              <p><strong>Event:</strong> {selectedCoupon.event}</p>
              <p><strong>Status:</strong> {selectedCoupon.isActive ? "Active" : "Inactive"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};