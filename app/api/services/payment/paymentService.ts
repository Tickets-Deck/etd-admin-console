import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function fetchPayments(req: NextRequest) {
  // Get the search params from the request url
  const searchParams = new URLSearchParams(req.url.split("?")[1]);

  // Get the userId from the search params
  const userId = searchParams.get("userId");

  // If a userId is provided, find the adminUser with that id
  if (userId) {
    const allPayments = await prisma.payments.findMany({
        include: {
            user: true,
            ticketOrder: {
                include: {
                    event: true
                }
            }
        }
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
  } else {
    // If no userId is provided, return 400
    return {
      error: ApplicationError.AdminUserIdIsRequired.Text,
      errorCode: ApplicationError.AdminUserIdIsRequired.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }
}
