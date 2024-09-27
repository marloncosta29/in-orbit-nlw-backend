import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoalCompletion } from "../funtions/create-goal-completion";
import { getWeekPendingGoals } from "../funtions/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/pending-goals", async () => getWeekPendingGoals());
};
