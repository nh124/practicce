import { listingsRouter } from "~/server/api/routers/listings";
import { createTRPCRouter } from "~/server/api/trpc";
import { UserRouter } from "./routers/UserRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listings: listingsRouter,
  users: UserRouter,
});

export type AppRouter = typeof appRouter;
