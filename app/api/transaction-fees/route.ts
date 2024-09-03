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
    // Fetch all transaction fees
    const operation = await fetchAllTransactionFees();

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToFetchTransactionFees.Text },
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
    const request = (await req.json()) as TransactionFeeRequest;

    // Create a transaction fee
    const operation = await createTransactionFee(request);

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch(error) {
    console.log("🚀 ~ file: route.ts ~ line 99 ~ POST ~ error", error)
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToCreateTransactionFee.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}

export async function DELETE(req: NextRequest) {
  // validate request method
  await validateRequestMethod(req, "DELETE");

  // Authenticate admin user
  const adminAuthResponse = await authenticateAdminUser(req);

  if (adminAuthResponse) {
    // If authentication failed, return the error response
    return adminAuthResponse;
  }

  try {
    // Get the search params from the request url
    const searchParams = new URLSearchParams(req.url.split("?")[1]);
    const transactionFeeId = searchParams.get("transactionFeeId");

    if (!transactionFeeId) {
      return NextResponse.json(
        { error: "Transaction fee ID is required" },
        { status: 400 }
      );
    }

    // Delete the transaction fee
    const operation = await deleteTransactionFee(transactionFeeId);

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToDeleteTransactionFee.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}
