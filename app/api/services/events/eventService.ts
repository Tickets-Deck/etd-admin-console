import { prisma } from "@/lib/prisma";

export async function fetchAllEvents() {
  const allEvents = await prisma.events.findMany({
    select: {
      id: true,
      title: true,
      eventId: true,
      ticketOrdersCount: true,
      date: true,
      time: true,
      tickets: {
        select: {
          name: true,
        },
      },
      ticketOrders: {
        where: {
            orderStatus: "Confirmed"
        },
        select: {
            payments: {
                // where: {
                //     ticketOrder: {
                //         orderStatus: "Confirmed"
                //     }
                // },
                select: {
                    amountPaid: true,
                }
            },
            quantity: true
        }
      },
      _count: {
        select: {
          tickets: true,
          couponCodes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  // construct the data
  const data = allEvents.map((event) => {
    return {
      id: event.id,
      title: event.title,
      eventId: event.eventId,
      date: event.date,
      time: event.time,
      revenue: event.ticketOrders.reduce((acc, curr) => acc + curr.payments.reduce((acc, curr) => acc + Number(curr.amountPaid), 0), 0),
      numberOfTicketOrders: event.ticketOrders.reduce((acc, curr) => acc + curr.quantity, 0),
      numberOfCouponCodes: event._count.couponCodes,
      numberOfTickets: event._count.tickets,
    };
  });

  return { data: data };
}
