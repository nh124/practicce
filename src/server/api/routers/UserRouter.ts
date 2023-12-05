import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const UserRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.auth.userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),

  searchCustomer: protectedProcedure.query(async ({ input, ctx }) => {
    const users = await ctx.prisma.user.findFirst({
      where: {
        role: input.role,
        email: {
          contains: input.email,
        },
      },
    });
    return users;
  }),

  AddCustomer: protectedProcedure.mutation(async ({ ctx, input }) => {
    const user = UserRouter.get({ input: { id: ctx.auth.userId }, ctx });
    if (user === null) throw new Error("User not found");
    const customer = UserRouter.searchCustomer({
      role: "CUSTOMER",
      email: input?.email,
    });
    if (customer === null) {
      throw new Error("Customer does not exists");
    }
    const updateUser = await ctx.prisma.user.update({
      where: {
        id: ctx.auth.userId,
      },
      data: {
        customerId: customer.id, // placeholder
      },
    });
    return updateUser;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.auth.userId,
        },
      });
      if (existingUser) {
        // User with the given name already exists, handle accordingly
        throw new Error("User with this name already exists");
      }
      const user = await ctx.prisma.user.create({
        data: {
          ...input,
          id: ctx.auth.userId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          sellerId: ctx.auth.userId,
        },
      });
      return user;
    }),
});
