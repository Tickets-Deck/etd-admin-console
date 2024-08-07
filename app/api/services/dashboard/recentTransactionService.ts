import { ApplicationError } from "@/app/constants/applicationError";
import { DashboardInfoResponse } from "@/app/models/IDashboardInfoResponse";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export async function fetchRecentTransactions(req: NextRequest) {
  // Get the search params from the request url
  const searchParams = new URLSearchParams(req.url.split("?")[1]);

  // Get the userId from the search params
  const userId = searchParams.get("userId");

  // If a userId is provided, find the adminUser with that id
  if (userId) {
    const adminUser = await prisma.adminUsers.findUnique({
      where: {
        id: userId,
      },
    });

    const recentBookings = await prisma.ticketOrders.findMany({
      // where: {
      //     paymentStatus: PaymentStatus.Paid,
      // },
      take: 15,
      orderBy: {
        createdAt: "desc",
      },
      //   include: {
      //     event: true,
      //     user: true,
      //   },
    });

    // If the user is found, return the user
    if (adminUser) {
      // Return the recent transactions
      return { data: recentBookings };
    } else {
      // If the user is not found, return 404
      return {
        error: ApplicationError.AdminUserWithIdNotFound.Text,
        errorCode: ApplicationError.AdminUserWithIdNotFound.Code,
        statusCode: StatusCodes.BadRequest,
      };
    }
  } else {
    // If no userId is provided, return 400
    return {
      error: ApplicationError.AdminUserIdIsRequired.Text,
      errorCode: ApplicationError.AdminUserIdIsRequired.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }
}
