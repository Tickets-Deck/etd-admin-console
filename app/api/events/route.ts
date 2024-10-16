import { NextRequest, NextResponse } from "next/server";
import { validateRequestMethod } from "../services/reusable-services/requestMethodValidator";
import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { customNextResponseError } from "../utils/customNextResponseError";
import { authenticateAdminUser } from "../services/reusable-services/adminUserAuthenticator";
import {
  fetchAllEvents,
  sendEmailToAllTicketOrderContacts,
} from "../services/events/eventService";
import { IEventEmail } from "@/app/models/IEmail";

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
    const operation = await fetchAllEvents(req);

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

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

export async function POST(req: NextRequest) {
  // validate request method
  await validateRequestMethod(req, "POST");

  // Authenticate admin user
  const adminAuthResponse = await authenticateAdminUser(req);

  if (adminAuthResponse) {
    // If authentication failed, return the error response
    return adminAuthResponse;
  }

  try {
    // Get the body of the request
    const request = (await req.json()) as IEventEmail;

    const operation = await sendEmailToAllTicketOrderContacts(request);

    if (operation.error) {
      return customNextResponseError(operation);
    }

    return NextResponse.json(operation, { status: StatusCodes.Success });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { error: ApplicationError.InternalServerError.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}
