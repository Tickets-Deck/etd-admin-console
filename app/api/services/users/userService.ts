import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function fetchUsers(req: NextRequest) {
  // Get the search params from the request url
  const searchParams = new URLSearchParams(req.url.split("?")[1]);

  // Get the userId from the search params
  const userId = searchParams.get("userId");

  // If a userId is provided, find the adminUser with that id
  if (userId) {
    const allUsers = await prisma.users.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: allUsers };
  } else {
    // If no userId is provided, return 400
    return {
      error: ApplicationError.AdminUserIdIsRequired.Text,
      errorCode: ApplicationError.AdminUserIdIsRequired.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }
}
