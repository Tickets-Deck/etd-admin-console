"use client";
import { CouponsTable } from "@/components/coupons-page/CouponsTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

type Props = {};

export default function CouponsPage({}: Props) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    discount: "",
    maxUsage: "",
    validUntil: "",
    event: "",
  });

  const handleOpenForm = (coupon?: any) => {
    if (coupon) {
      setFormData({
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        maxUsage: coupon.maxUsage,
        validUntil: coupon.validUntil,
        event: coupon.event,
      });
    } else {
      setFormData({
        id: "",
        code: "",
        discount: "",
        maxUsage: "",
        validUntil: "",
        event: "",
      });
    }
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Coupon:", formData);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search coupons..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CouponsTable />

      {/* Create/Edit Coupon Modal */}
      <Dialog open={showForm} onOpenChange={() => setShowForm(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formData.id ? "Edit Coupon" : "Create Coupon"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Code</Label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Discount</Label>
              <Input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Max Usage</Label>
              <Input
                name="maxUsage"
                type="number"
                value={formData.maxUsage}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Valid Until</Label>
              <Input
                name="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Event (optional)</Label>
              <Input
                name="event"
                value={formData.event}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
