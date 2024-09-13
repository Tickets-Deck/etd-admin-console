import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function authenticateAdminUser(req: NextRequest) {
  // Get the search params from the request url
  const searchParams = new URLSearchParams(req.url.split("?")[1]);

  // Get the userId from the search params
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: ApplicationError.AdminUserIdIsRequired.Text },
      { status: StatusCodes.BadRequest }
    );
  }

  const adminUser = await prisma.adminUsers.findUnique({
    where: {
      id: userId,
    },
  });

  if (!adminUser) {
    return NextResponse.json(
      {
        error: ApplicationError.AdminUserWithIdNotFound.Text,
      },
      { status: StatusCodes.Unauthorized }
    );
  }

  // Attach the adminUser to the request object for further use
  (req as any).adminUser = adminUser;

  // Return null to indicate success
  return null;
}
