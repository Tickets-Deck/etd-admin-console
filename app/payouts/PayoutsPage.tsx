"use client"
import { PayoutsTable } from '@/components/payouts-page/PayoutsTable';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

type Props = {}

export default function PayoutsPage({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
      <div className="space-y-6 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
        </div>
  
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search payouts..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <PayoutsTable />
  
        {/* <CreateTicketModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        /> */}
      </div>
  )
}