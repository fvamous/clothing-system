import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { OrderStatus } from "@prisma/client";

const allowedStatuses: OrderStatus[] =
  [
    "PENDING",
    "PAID",
    "SHIPPED",
    "CANCELLED",
  ];

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const resolved =
      await params;

    const orderId = Number(
      resolved.id
    );

    if (
      !Number.isFinite(orderId)
    ) {
      return NextResponse.json(
        {
          error: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }

    const body =
      await req.json();

    if (
      !body.status ||
      !allowedStatuses.includes(
        body.status
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid status",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await prisma.order.findUnique(
        {
          where: {
            id: orderId,
          },
        }
      );

    if (!order) {
      return NextResponse.json(
        {
          error:
            "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      order.status ===
        "SHIPPED" ||
      order.status ===
        "CANCELLED"
    ) {
      return NextResponse.json(
        {
          error:
            "Order finalized",
        },
        {
          status: 400,
        }
      );
    }

    const updated =
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: body.status,
        },
      });

    return NextResponse.json(
      updated
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}