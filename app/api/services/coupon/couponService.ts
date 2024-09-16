import { ApplicationError } from "@/app/constants/applicationError";
import { CouponCodeRequest } from "@/app/models/ICoupon";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { prisma } from "@/lib/prisma";

export async function createCouponCode(data: CouponCodeRequest) {
  const { code, discount, maxUsage, validUntil, eventId } = data;

  // check if the fields are provided
  if (!code || !discount || !validUntil || !eventId) {
    return {
      error: ApplicationError.MissingRequiredParameters.Text,
      errorCode: ApplicationError.MissingRequiredParameters.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }

  // ensure the code has a max length of 6 characters
  if (code.length > 6) {
    return {
      error: ApplicationError.CouponCodeTooLong.Text,
      errorCode: ApplicationError.CouponCodeTooLong.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }

  // check if the discount is a valid number
  if (isNaN(discount)) {
    return {
      error: ApplicationError.InvalidCouponDiscount.Text,
      errorCode: ApplicationError.InvalidCouponDiscount.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }

  // if the date is provided, check if it is a valid date
  if (validUntil) {
    const date = new Date(validUntil);
    if (isNaN(date.getTime()) || date < new Date()) {
      return {
        error: ApplicationError.InvalidCouponExpirationDate.Text,
        errorCode: ApplicationError.InvalidCouponExpirationDate.Code,
        statusCode: StatusCodes.BadRequest,
      };
    }
  }

  // check if the event exists
  const event = await prisma.events.findFirst({
    where: {
      eventId,
    },
    include: {
      tickets: {
        select: {
          price: true,
        },
      },
    },
  });

  if (!event) {
    return {
      error: ApplicationError.EventWithIdNotFound.Text,
      errorCode: ApplicationError.EventWithIdNotFound.Code,
      statusCode: StatusCodes.NotFound,
    };
  }

  // if all the tickets for the event are free, return an error
  if (event.tickets.every((ticket) => Number(ticket.price) === 0)) {
    return {
      error: ApplicationError.CouponCannotBeAppliedToFreeEvent.Text,
      errorCode: ApplicationError.CouponCannotBeAppliedToFreeEvent.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }

  // check if the coupon code already exists
  const existingCouponCode = await prisma.couponCodes.findFirst({
    where: {
      code,
    },
  });

  if (existingCouponCode) {
    return {
      error: ApplicationError.CouponCodeAlreadyExists.Text,
      errorCode: ApplicationError.CouponCodeAlreadyExists.Code,
      statusCode: StatusCodes.BadRequest,
    };
  }

  // create the coupon code
  const couponCode = await prisma.couponCodes.create({
    data: {
      code,
      discount,
      maxUsage: maxUsage ?? 10,
      validUntil: new Date(validUntil),
      events: event.id
        ? {
            connect: {
              id: event.id,
            },
          }
        : undefined,
    },
  });

  return { data: couponCode };
}

export async function fetchAllCouponCodes() {
  const allCouponCodes = await prisma.couponCodes.findMany({
    select: {
      id: true,
      code: true,
      discount: true,
      maxUsage: true,
      validUntil: true,
      events: {
        select: {
          title: true,
          eventId: true,
        },
      },
    },
  });

  if (!allCouponCodes) {
    return {
      error: ApplicationError.FailedToFetchCouponCodes.Text,
      errorCode: ApplicationError.FailedToFetchCouponCodes.Code,
      statusCode: StatusCodes.InternalServerError,
    };
  }

  return { data: allCouponCodes };
}

export async function deleteCouponCode(id: string) {
  const couponCode = await prisma.couponCodes.delete({
    where: {
      id,
    },
  });

  // if the coupon code is not found, return an error
  if (!couponCode) {
    return {
      error: ApplicationError.CouponCodeNotFound.Text,
      errorCode: ApplicationError.CouponCodeNotFound.Code,
      statusCode: StatusCodes.NotFound,
    };
  }

  return { success: true };
}
