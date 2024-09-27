import fastfy from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoalRoute } from "../routes/create-goals";
import { createGoalCompletionRoute } from "../routes/create-goals-completion";
import { getPendingGoalsRoute } from "../routes/get-pending-goals";
import { getWeekSummaryRoute } from "../routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastfy().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*", // for dev only
});

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server running");
  });
