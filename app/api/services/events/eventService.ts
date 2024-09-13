import { prisma } from "@/lib/prisma";

export async function fetchAllEvents() {
  const allEvents = await prisma.events.findMany({
    select: {
      id: true,
      title: true,
      eventId: true,
      ticketOrdersCount: true,
      tickets: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          tickets: true,
          ticketOrders: {
            where: {
              orderStatus: "Confirmed",
            },
          },
          couponCodes: true,
        },
      },
    },
  });

  // construct the data
  const data = allEvents.map((event) => {
    return {
      id: event.id,
      title: event.title,
      eventId: event.eventId,
      numberOfTicketOrders: event._count.ticketOrders,
      numberOfCouponCodes: event._count.couponCodes,
      numberOfTickets: event._count.tickets,
    };
  });

  return { data: data };
}
