"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ImageIcon,
} from "lucide-react";

import Surface from "@/components/primitives/surface/Surface";

type LookbookItem = {
  id: string;
  imageUrl: string;
};

export default function AdminLookbook() {
  const [items, setItems] =
    useState<LookbookItem[]>([]);

  /*
  -----------------------------------
  fetch lookbook
  -----------------------------------
  */

  useEffect(() => {
    async function fetchLookbook() {
      try {
        const res = await fetch(
          "/api/lookbook"
        );

        if (!res.ok) {
          throw new Error(
            "Failed fetch"
          );
        }

        const data: LookbookItem[] =
          await res.json();

        setItems(data);
      } catch (err) {
        console.error(
          "Failed to load lookbook",
          err
        );
      }
    }

    fetchLookbook();
  }, []);

  return (
    <section className="mx-auto max-w-7xl space-y-8">
      <Surface
        className="
          overflow-hidden
          rounded-[42px]
          p-8
          md:p-10
        "
      >
        <div
          className="
            mb-10
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-zinc-200
                bg-white/70
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-zinc-600
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-zinc-300
              "
            >
              <ImageIcon className="h-4 w-4" />

              Fashion Editorial
            </div>

            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                text-zinc-900
                dark:text-white
              "
            >
              Lookbook CMS
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-relaxed
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Manage editorial
              fashion assets,
              campaign visuals,
              and premium
              storefront
              photography.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >
            <div
              className="
                rounded-3xl
                border
                border-zinc-200
                bg-white/70
                px-6
                py-5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.04]
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-zinc-500
                "
              >
                Total Assets
              </p>

              <h3
                className="
                  mt-2
                  text-3xl
                  font-black
                  text-zinc-900
                  dark:text-white
                "
              >
                {items.length}
              </h3>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-zinc-200
                bg-white/70
                px-6
                py-5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.04]
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-zinc-500
                "
              >
                Status
              </p>

              <h3
                className="
                  mt-2
                  text-lg
                  font-black
                  text-emerald-500
                "
              >
                Active
              </h3>
            </div>
          </div>
        </div>

        {/* lanjut JSX bawah tetap sama */}
      </Surface>
    </section>
  );
}
