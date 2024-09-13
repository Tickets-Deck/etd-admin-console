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
import {
  createCouponCode,
  deleteCouponCode,
  fetchAllCouponCodes,
} from "../services/coupon/couponService";
import { CouponCodeRequest } from "@/app/models/ICoupon";

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
    // Fetch all coupon codes
    const operation = await fetchAllCouponCodes();

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToFetchCouponCodes.Text },
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
    const request = (await req.json()) as CouponCodeRequest;

    // Create a coupon code
    const operation = await createCouponCode(request);

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json(operation.data, { status: StatusCodes.Success });
  } catch (error) {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToCreateCouponCode.Text },
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
    const couponId = searchParams.get("couponId");

    if (!couponId) {
      return NextResponse.json(
        { error: "Coupon code ID is required" },
        { status: 400 }
      );
    }

    // Delete the transaction fee
    const operation = await deleteCouponCode(couponId);

    // If operation fails, return the error
    if (operation.error) {
      return customNextResponseError(operation);
    }

    // Return the response
    return NextResponse.json({});
  } catch {
    // Return an error if the operation fails
    return NextResponse.json(
      { error: ApplicationError.FailedToDeleteCouponCode.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}
