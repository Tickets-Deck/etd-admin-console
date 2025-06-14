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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockSubscribers = [
  { id: "1", email: "user1@example.com", createdAt: "2024-01-01" },
  { id: "2", email: "user2@example.com", createdAt: "2024-02-15" },
];

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState(mockSubscribers);
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleAdd = () => {
    setSubscribers((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        email: newEmail,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewEmail("");
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDownloadCSV = () => {
    const csv = [
      ["ID", "Email", "Created At"],
      ...subscribers.map((s) => [s.id, s.email, s.createdAt]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Newsletters</h1>
        <div className="flex flex-row gap-3">
          <Button onClick={() => setShowForm(true)}>Add Email</Button>
          <Button variant="outline" onClick={handleDownloadCSV}>
            Download CSV
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.createdAt}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(subscriber.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Email Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Subscriber</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAdd} disabled={!newEmail}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsletterPage;
