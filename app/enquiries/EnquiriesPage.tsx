import { EnquiriesTable } from "@/components/enquiries-page/EnquiriesTable";
import React from "react";

type Props = {};

export default function EnquiriesPage({}: Props) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Enquiries</h2>
      <EnquiriesTable />
    </div>
  );
}
