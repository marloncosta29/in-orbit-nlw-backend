import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const results = await db
    .insert(goals)
    .values([
      { title: "Acordar cedo", desireWeeklyFrequency: 5 },
      { title: "Fazer academia", desireWeeklyFrequency: 3 },
      { title: "tomar agua", desireWeeklyFrequency: 7 },
    ])
    .returning();

  const startOfWeek = dayjs().startOf("week");

  await db.insert(goalCompletions).values([
    { goalId: results[0].id, createdAt: startOfWeek.toDate() },
    { goalId: results[1].id, createdAt: startOfWeek.add(1).toDate() },
  ]);
}

seed().finally(() => {
  client.end();
});
