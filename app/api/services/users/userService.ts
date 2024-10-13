import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function fetchUsers(req: NextRequest) {
    const allUsers = await prisma.users.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
            select: {
                events:  true,
            }
        }
      }
    });

    return { data: allUsers };
}
