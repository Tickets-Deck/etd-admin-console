import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";

export async function fetchPayments() {
  const allPayments = await prisma.payments.findMany({
    include: {
      user: true,
      ticketOrder: {
        include: {
          event: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // If the user is found, return the user
  if (allPayments) {
    // Return the dashboard data
    return { data: allPayments };
  } else {
    // If the user is not found, return 404
    return {
      error: ApplicationError.AdminUserWithIdNotFound.Text,
      errorCode: ApplicationError.AdminUserWithIdNotFound.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }
}
