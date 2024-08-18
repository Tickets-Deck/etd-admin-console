import { NextRequest, NextResponse } from "next/server";
import { validateRequestMethod } from "../services/reusable-services/requestMethodValidator";
import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { customNextResponseError } from "../utils/customNextResponseError";
import { authenticateAdminUser } from "../services/reusable-services/adminUserAuthenticator";
import { fetchAllTicketOrders, fetchSingleTicketOrder } from "../services/ticket-order/ticketOrderService";

export async function GET(req: NextRequest) {
  // validate request method
  await validateRequestMethod(req, "GET");

  // Authenticate admin user
  const adminAuthResponse = await authenticateAdminUser(req);

  if (adminAuthResponse) {
    // If authentication failed, return the error response
    return adminAuthResponse;
  }

  try {
    // Get the search params from the request url
    const searchParams = new URLSearchParams(req.url.split("?")[1]);
    // const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    // Declare operation variable
    let operation;

    if (orderId) {
      // Fetch a specific ticket order by ID
      operation = await fetchSingleTicketOrder(orderId);
    } else {
      // Fetch all ticket orders
      operation = await fetchAllTicketOrders();
    }

    // Call the function to fetch all ticket orders
    // const operation = await fetchAllTicketOrders();

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToFetchUserDashboardData.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}
