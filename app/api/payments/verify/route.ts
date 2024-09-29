import { ApplicationError } from "@/app/constants/applicationError";
import { StatusCodes } from "@/app/models/IStatusCodes";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const trxref = searchParams.get("trxref");

  // Construct the URL of the external API
  const externalApiUrl = `${process.env.WEBSITE_URL}/api/events/tickets/payment?trxref=${trxref}`;

  try {
    // Fetch the data from the external API
    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    // console.log("Response gotten from external API", response);

    if (!response.ok) {
        return NextResponse.json(
          { error: ApplicationError.InternalServerError.Text },
          { status: StatusCodes.BadRequest }
        ); 
    }

    // Parse the response data
    const data = await response.json();

    // Send the response data back to the client
    return NextResponse.json(data, { status: StatusCodes.Success });
  } catch (error) {
    return NextResponse.json(
      { error: ApplicationError.InternalServerError.Text },
      { status: StatusCodes.InternalServerError }
    );
  }
}
