// hooks/ui/useBreakpoint.ts

"use client";

import { useEffect, useState } from "react";

import { breakpoints } from "@/lib/ui/breakpoints";

type BreakpointKey =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl";

type BreakpointState = {
  width: number;

  current: BreakpointKey;

  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
};

function getBreakpoint(
  width: number
): BreakpointKey {
  if (width >= breakpoints["2xl"]) {
    return "2xl";
  }

  if (width >= breakpoints.xl) {
    return "xl";
  }

  if (width >= breakpoints.lg) {
    return "lg";
  }

  if (width >= breakpoints.md) {
    return "md";
  }

  if (width >= breakpoints.sm) {
    return "sm";
  }

  return "xs";
}

function createState(
  width: number
): BreakpointState {
  const current =
    getBreakpoint(width);

  return {
    width,

    current,

    isXs: current === "xs",

    isSm:
      width >= breakpoints.sm,

    isMd:
      width >= breakpoints.md,

    isLg:
      width >= breakpoints.lg,

    isXl:
      width >= breakpoints.xl,

    is2xl:
      width >= breakpoints["2xl"],
  };
}

export function useBreakpoint() {
  const [state, setState] =
    useState<BreakpointState>(
      createState(0)
    );

  useEffect(() => {
    function handleResize() {
      setState(
        createState(
          window.innerWidth
        )
      );
    }

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return state;
}