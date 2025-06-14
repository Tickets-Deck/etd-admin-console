"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockPayouts = [
  {
    id: "1",
    amount: "5000.00",
    payoutDate: "2024-05-20",
    status: "Pending",
    paymentMethod: "Paystack",
    transactionRef: "TXN12345678",
    serviceFees: "250.00",
    tax: "50.00",
    currency: "NGN",
    notes: "First payout",
    customer: "John Doe",
    eventName: "Music Fest 2024",
  },
];

export const PayoutsTable = () => {
  const [viewPayout, setViewPayout] = useState<any | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; type: "approve" | "disapprove" } | null>(null);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPayouts.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>{payout.customer}</TableCell>
              <TableCell>{payout.eventName}</TableCell>
              <TableCell>₦{payout.amount}</TableCell>
              <TableCell>{payout.status}</TableCell>
              <TableCell>{payout.paymentMethod}</TableCell>
              <TableCell>{payout.payoutDate}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline" onClick={() => setViewPayout(payout)}>
                  View
                </Button>
                <Button size="sm" onClick={() => setConfirmAction({ id: payout.id, type: "approve" })}>
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setConfirmAction({ id: payout.id, type: "disapprove" })}>
                  Disapprove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Modal */}
      {viewPayout && (
        <Dialog open onOpenChange={() => setViewPayout(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payout Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <p><strong>Customer:</strong> {viewPayout.customer}</p>
              <p><strong>Event:</strong> {viewPayout.eventName}</p>
              <p><strong>Amount:</strong> ₦{viewPayout.amount}</p>
              <p><strong>Status:</strong> {viewPayout.status}</p>
              <p><strong>Payment Method:</strong> {viewPayout.paymentMethod}</p>
              <p><strong>Transaction Ref:</strong> {viewPayout.transactionRef}</p>
              <p><strong>Service Fees:</strong> ₦{viewPayout.serviceFees}</p>
              <p><strong>Tax:</strong> ₦{viewPayout.tax}</p>
              <p><strong>Currency:</strong> {viewPayout.currency}</p>
              <p><strong>Notes:</strong> {viewPayout.notes}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Action Modal */}
      {confirmAction && (
        <Dialog open onOpenChange={() => setConfirmAction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{confirmAction.type === "approve" ? "Approve" : "Disapprove"} Payout</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to {confirmAction.type} this payout?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setConfirmAction(null)}>
                Cancel
              </Button>
              <Button
                variant={confirmAction.type === "approve" ? "default" : "destructive"}
                onClick={() => {
                  console.log(`${confirmAction.type} payout`, confirmAction.id);
                  setConfirmAction(null);
                }}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
