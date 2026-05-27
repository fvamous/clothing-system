import { NextResponse } from "next/server";

type ApiError = {
  message: string;
  statusCode: number;
};

function isApiError(
  error: unknown
): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in error
  );
}

export function handleApiError(
  error: unknown
) {
  console.error(error);

  if (isApiError(error)) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal server error",
    },
    {
      status: 500,
    }
  );
}