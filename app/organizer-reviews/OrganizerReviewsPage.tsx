"use client"
import { OrganizerReviewsTable } from '@/components/organizer-reviews-page/OrganizerReviewsTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

export default function OrganizerReviewsPage({}: Props) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Organizer Reviews</h1>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search reviews..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <OrganizerReviewsTable />
    </div>
  )
}