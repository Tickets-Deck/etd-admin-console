import { ApplicationError } from "@/app/constants/applicationError";
import { OrderStatus } from "@/app/enums/IOrderStatus";
import { StatusCodes } from "@/app/models/IStatusCodes";
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
    },
  });

  return { data: allEvents };
}
