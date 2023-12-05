import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.listing.findMany({
      where: {
        ownerId: ctx.auth.userId,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        ownerId: z.number(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const listing = await ctx.prisma.listing.create({
        data: {
          ...input,
          ownerId: ctx.auth.userId,
          role: "owner",
        },
      });
      return listing;
    }),
});
