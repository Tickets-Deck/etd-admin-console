import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { TransactionFeeRequest } from "@/app/models/ITransactionFee";
import { prisma } from "@/lib/prisma";

export async function createTransactionFee(data: TransactionFeeRequest) {
  // destructuring the data object
  const { flatFee, percentage, eventId } = data;

  let retrievedEventId: string | undefined;

  // if the eventId is provided, check if the event exists
  if (eventId) {
    const event = await prisma.events.findFirst({
      where: {
        eventId,
      },
      select: { id: true },
    });

    retrievedEventId = event?.id;

    // if the event does not exist, return an error
    if (!event) {
      return {
        error: ApplicationError.EventWithIdNotFound.Text,
        errorCode: ApplicationError.EventWithIdNotFound.Code,
        statusCode: StatusCodes.NotFound,
      };
    }
  }

  // if eventId was not provided, check if there is already a transaction fee without an event. If there is, update it
  if (!eventId) {
    const existingTransactionFee = await prisma.transactionFees.findFirst({
      where: {
        events: {
          none: {},
        },
      },
    });

    if (existingTransactionFee) {
      const updatedTransactionFee = await prisma.transactionFees.update({
        where: {
          id: existingTransactionFee.id,
        },
        data: {
          flatFee: flatFee ?? 0,
          percentage: percentage ?? 0,
        },
      });

      return { data: updatedTransactionFee };
    }
  }

  // if we get here, it means we are creating a new transaction fee for an event

  // create the transaction fee
  const transactionFee = await prisma.transactionFees.create({
    data: {
      flatFee: flatFee ?? 0,
      percentage: percentage ?? 0,
      events: eventId
        ? {
            connect: {
              id: retrievedEventId,
            },
          }
        : undefined,
    },
  });

  return { data: transactionFee };
}

export async function fetchAllTransactionFees() {
  const allTransactionFees = await prisma.transactionFees.findMany({
    select: {
      id: true,
      flatFee: true,
      percentage: true,
      events: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!allTransactionFees) {
    // if there was an error fetching the transaction fees, return the error
    return {
      error: ApplicationError.FailedToFetchTransactionFees.Text,
      errorCode: ApplicationError.FailedToFetchTransactionFees.Code,
      statusCode: StatusCodes.InternalServerError,
    };
  }

  return { data: allTransactionFees };
}

export async function deleteTransactionFee(transactionFeeId: string) {
  const deletedTransactionFee = await prisma.transactionFees.delete({
    where: {
      id: transactionFeeId,
    },
  });

  if (!deletedTransactionFee) {
    return {
      error: ApplicationError.FailedToDeleteTransactionFee.Text,
      errorCode: ApplicationError.FailedToDeleteTransactionFee.Code,
      statusCode: StatusCodes.InternalServerError,
    };
  }

  return { data: deletedTransactionFee };
}
