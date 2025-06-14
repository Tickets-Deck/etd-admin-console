"use client";
import { EventsTable } from "@/components/events-page/EventsTable";
import { CreateEventModal } from "@/components/modal/CreateEventModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useFetchEvents,
  useSendEmailToAllTicketOrderContacts,
} from "../api/apiClient";
import { EventResponse } from "@/models/IEvent";
import { useSession } from "next-auth/react";
import { PaginationMetaProps } from "@/types/pagination";

type Props = {};

export default function EventsPage({}: Props) {
  const fetchEvents = useFetchEvents();
  const sendEmailToAllTicketOrderContacts =
    useSendEmailToAllTicketOrderContacts();

  const { data: session, status } = useSession();
  const user = session?.user;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>();
  const [events, setEvents] = useState<EventResponse[]>();
  const [eventsMeta, setEventsMeta] = useState<PaginationMetaProps>();
  const [[page, limit], setPaginationMeta] = useState([1, 10]);

  const handleFetchEvents = async (page: number = 1, _searchQuery?: string) => {
    setPaginationMeta([page, limit]);

    // show loader
    setIsFetchingEvents(true);

    await fetchEvents(
      user?.token as string,
      page.toString(),
      limit.toString(),
      _searchQuery ?? searchQuery ?? ""
    )
      .then((response) => {
        setEvents(response.data.events);
        setEventsMeta(response.data.meta);
      })
      .catch((error) => {
        // catchError(error);
      })
      .finally(() => {
        setIsFetchingEvents(false);
      });
  };

  useEffect(() => {
    handleFetchEvents();
  }, [user]);

  return (
    <div className="space-y-6 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        {/* <Button disabled={isLoading} onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Event
        </Button> */}
      </div>
      <div className="flex items-center gap-2">
        <Input
          disabled={isFetchingEvents}
          placeholder="Search events..."
          className="max-w-sm"
        />
      </div>
      <EventsTable isLoading={isFetchingEvents} events={events} />

      <div className="flex justify-end mt-4 p-5">
        {eventsMeta && eventsMeta.totalPages > 1 && (
          <Pagination
            meta={{ ...eventsMeta, page }}
            onPageChange={(page) => handleFetchEvents(page)}
          />
        )}
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
