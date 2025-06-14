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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockReviews = [
  {
    id: "1",
    rating: 4,
    reviewText: "Organizer was professional and responsive.",
    event: "Tech Conference 2025",
    reviewer: "Jane Doe",
    organizer: "John Organizer",
    createdAt: "2025-04-10",
  },
  {
    id: "2",
    rating: 2,
    reviewText: "The organizer was hard to reach and event was poorly managed.",
    event: "Music Fiesta",
    reviewer: "Alice Smith",
    organizer: "Mark Events",
    createdAt: "2025-03-15",
  },
];

export const OrganizerReviewsTable = () => {
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reviewer</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.reviewer}</TableCell>
              <TableCell>{review.organizer}</TableCell>
              <TableCell>
                <Badge>{review.rating} ★</Badge>
              </TableCell>
              <TableCell>{review.event || "General"}</TableCell>
              <TableCell>{review.createdAt}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedReview(review);
                    setShowDetails(true);
                  }}
                >
                  View
                </Button>
                <Button size="sm" variant="destructive">
                  Flag Organizer
                </Button>
                <Button size="sm" variant="default">
                  Respond
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Review Detail Modal */}
      <Dialog open={showDetails} onOpenChange={() => setShowDetails(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-2 text-sm">
              <p><strong>Reviewer:</strong> {selectedReview.reviewer}</p>
              <p><strong>Organizer:</strong> {selectedReview.organizer}</p>
              <p><strong>Event:</strong> {selectedReview.event || "General"}</p>
              <p><strong>Rating:</strong> {selectedReview.rating} ★</p>
              <p><strong>Review:</strong> {selectedReview.reviewText}</p>
              <p><strong>Date:</strong> {selectedReview.createdAt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
