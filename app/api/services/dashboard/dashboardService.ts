import { ApplicationError } from "@/app/constants/applicationError";
import { DashboardInfoResponse } from "@/app/models/IDashboardInfoResponse";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export async function fetchDashboardData(req: NextRequest) {
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

    const totalEvents = await prisma.events.count();

    const _totalPayments = await prisma.payments.count({
      where: {
        paymentStatus: PaymentStatus.Paid,
      },
    });
    // console.log("🚀 ~ fetchDashboardData ~ _totalPayments:", _totalPayments)
    
    const totalPayments = await prisma.payments.findMany({
      where: {
        paymentStatus: PaymentStatus.Paid,
      },
    });
    const totalRevenue = totalPayments.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);
    // console.log("🚀 ~ totalRevenue ~ totalRevenue:", totalRevenue)
    
    const totalUsers = await prisma.users.count();

    // If the user is found, return the user
    if (adminUser) {
      // Construct the dashboard data
      const dashboardData: DashboardInfoResponse = {
        totalEvents,
        totalRevenue,
        totalUsers
      };

      // Return the dashboard data
      return { data: dashboardData };
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
