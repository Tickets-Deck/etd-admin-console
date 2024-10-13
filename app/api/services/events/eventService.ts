import { prisma } from "@/lib/prisma";
import { compileThankYouTemplate, sendMail, sendMassMail } from "@/lib/mail";
import { IEventEmail } from "@/app/models/IEmail";
import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { NextRequest } from "next/server";

export async function fetchAllEvents(req: NextRequest) {
  // Get the search params from the request url
  const searchParams = new URLSearchParams(req.url.split("?")[1]);

  // Get the eventId from the search params
  const eventId = searchParams.get("eventId");

  if (eventId) {
    const event = await prisma.events.findFirst({
      where: {
        OR: [{ id: eventId }, { eventId }],
      },
      include: {
        tickets: true,
        ticketOrders: true,
        couponCodes: true,
        transactionFee: true,
        user: {
            select: {
                firstName: true,
                lastName: true,
            }
        }
      },
    });
    if (!event) {
      return {
        error: ApplicationError.EventWithIdNotFound.Text,
        errorCode: ApplicationError.EventWithIdNotFound.Code,
        statusCode: StatusCodes.BadRequest,
      };
    }

    return { data: event };
  }

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
          orderStatus: "Confirmed",
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
            },
          },
          quantity: true,
        },
      },
      user: {
          select: {
              firstName: true,
              lastName: true,
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
    },
  });

  // construct the data
  const data = allEvents.map((event) => {
    return {
      id: event.id,
      title: event.title,
      eventId: event.eventId,
      date: event.date,
      time: event.time,
      revenue: event.ticketOrders.reduce(
        (acc, curr) =>
          acc +
          curr.payments.reduce((acc, curr) => acc + Number(curr.amountPaid), 0),
        0
      ),
      publisher:  event.user.firstName + " " + event.user.lastName,
      numberOfTicketOrders: event.ticketOrders.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      ),
      numberOfCouponCodes: event._count.couponCodes,
      numberOfTickets: event._count.tickets,
    };
  });

  return { data: data };
}

export async function sendEmailToAllTicketOrderContacts(
  emailInfo: IEventEmail
) {
  console.log("Email Info", emailInfo);
  // destructure the emailInfo
  const { eventId, subject, body } = emailInfo;

  // check if all fields are provided
  if (!eventId || !subject || !body) {
    return {
      error: ApplicationError.MissingRequiredParameters.Text,
      errorCode: ApplicationError.MissingRequiredParameters.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }

  const ticketOrders = await prisma.ticketOrders.findMany({
    where: {
      eventId: eventId,
    },
    select: {
      event: {
        select: {
          title: true,
        },
      },
      tickets: {
        select: {
          associatedEmail: true,
          contactEmail: true,
        },
      },
    },
  });

  // make the contacts array flat and remove duplicates
  const contacts = ticketOrders.flatMap((ticketOrder) => {
    return ticketOrder.tickets.map((ticket) => {
      return ticket.associatedEmail || ticket.contactEmail;
    });
  });

  const uniqueContacts = Array.from(new Set(contacts));

  console.log("Contacts", uniqueContacts);

  await sendMassMail({
    to: uniqueContacts as string[],
    // name: "Name of the event",
    subject,
    body: compileThankYouTemplate({
      emailBody: body,
      eventName: ticketOrders[0].event.title,
    }),
  });

  return { contacts: uniqueContacts };
}
