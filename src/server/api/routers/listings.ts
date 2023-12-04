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
        ownerClerkId: ctx.auth.userId,
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
          ownerClerkId: ctx.auth.userId,
        },
      });
      return listing;
    }),
});

export const UserRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.prisma.user.findFirst({
        where: {
          userId: ctx.auth.userId,
        },
      });
      if (existingUser) {
        // User with the given name already exists, handle accordingly
        throw new Error("User with this name already exists");
      }
      const listing = await ctx.prisma.user.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
      return listing;
    }),
});
