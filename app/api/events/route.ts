import { NextRequest, NextResponse } from "next/server";
import { validateRequestMethod } from "../services/reusable-services/requestMethodValidator";
import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { customNextResponseError } from "../utils/customNextResponseError";
import { authenticateAdminUser } from "../services/reusable-services/adminUserAuthenticator";
import { TransactionFeeRequest } from "@/app/models/ITransactionFee";
import {
  createTransactionFee,
  deleteTransactionFee,
  fetchAllTransactionFees,
} from "../services/transaction-fee/feeService";
import { fetchAllEvents } from "../services/events/eventService";

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
    // Fetch all events
    const operation = await fetchAllEvents();

    // If operation fails, return the error
    // if (operation.error) {
    //   return customNextResponseError(operation);
    // }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch (error) {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToFetchEvents.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}
