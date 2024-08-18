import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { TicketOrderResponse } from "@/app/models/ITicketOrder";
import { prisma } from "@/lib/prisma";

export async function fetchAllTicketOrders() {
  const allTicketOrders = await prisma.ticketOrders.findMany({
    select: {
      id: true,
      contactEmail: true,
      orderId: true,
      totalPrice: true,
      createdAt: true,
      quantity: true,
      paymentStatus: true,
      payments: {
        select: {
          paymentServiceProvider: true,
        },
      },
      event: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!allTicketOrders) {
    // if there was an error fetching the ticket orders, return the error
    return {
      error: ApplicationError.FailedToFetchTicketOrders.Text,
      errorCode: ApplicationError.FailedToFetchTicketOrders.Code,
      statusCode: StatusCodes.InternalServerError,
    };
  }

  return { data: allTicketOrders };
}

export async function fetchSingleTicketOrder(orderId: string) {
  const singleTicketOrder = await prisma.ticketOrders.findUnique({
    where: {
      orderId: orderId,
    },
    include: {
        tickets: {
            select: {
                ticket: {
                    select: {
                        name: true,
                    }
                }
            }
        },
        user: {
            select: {
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
            }
        },
        event: {
            select: {
                title: true,
            }
        }
    }
  });

  if (!singleTicketOrder) {
    // if there was an error fetching the ticket orders, return the error
    return {
      error: ApplicationError.FailedToFetchTicketOrders.Text,
      errorCode: ApplicationError.FailedToFetchTicketOrders.Code,
      statusCode: StatusCodes.InternalServerError,
    };
  }

  return { data: singleTicketOrder };
}
