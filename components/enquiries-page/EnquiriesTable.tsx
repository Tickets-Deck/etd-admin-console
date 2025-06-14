"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const mockEnquiries = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Ticket not received",
    message: "I purchased a ticket but haven’t received it yet.",
    createdAt: new Date().toISOString(),
  },
];

export const EnquiriesTable = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleReply = () => {
    console.log("Reply to:", selectedEnquiry.email, "Message:", replyMessage);
    setShowReply(false);
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEnquiries.map((enquiry) => (
            <TableRow key={enquiry.id}>
              <TableCell>{enquiry.name}</TableCell>
              <TableCell>{enquiry.email}</TableCell>
              <TableCell>{enquiry.subject}</TableCell>
              <TableCell>{format(new Date(enquiry.createdAt), "PPP")}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedEnquiry(enquiry);
                    setShowDetails(true);
                  }}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => {
                    setSelectedEnquiry(enquiry);
                    setShowReply(true);
                  }}
                >
                  Reply
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Enquiry Modal */}
      <Dialog open={showDetails} onOpenChange={() => setShowDetails(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enquiry Info</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedEnquiry.name}</p>
              <p><strong>Email:</strong> {selectedEnquiry.email}</p>
              <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
              <p><strong>Message:</strong> {selectedEnquiry.message}</p>
              <p><strong>Date:</strong> {format(new Date(selectedEnquiry.createdAt), "PPpp")}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Modal */}
      <Dialog open={showReply} onOpenChange={() => setShowReply(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedEnquiry?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="reply">Message</Label>
            {/* <Editor id="reply" value={replyMessage} onChange={setReplyMessage} /> */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReply(false)}>Cancel</Button>
              <Button onClick={handleReply}>Send Reply</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
