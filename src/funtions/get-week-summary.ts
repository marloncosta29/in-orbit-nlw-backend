import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desireWeeklyFrequency: goals.desireWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );
  const goalCompletionInWeek = db.$with("goal_completion_In_week").as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        complatedAt: goalCompletions.createdAt,
        completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as(
          "completedAtDate"
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .orderBy(desc(goalCompletions.createdAt))
  );

  const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalCompletionInWeek.completedAtDate,
        completions: sql/*sql*/ `
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', ${goalCompletionInWeek.id},
                        'title', ${goalCompletionInWeek.title},
                        'completedAt', ${goalCompletionInWeek.complatedAt}
                    
                    )
                )
            `.as("completions"),
      })
      .from(goalCompletionInWeek)
      .groupBy(goalCompletionInWeek.completedAtDate)
      .orderBy(desc(goalCompletionInWeek.completedAtDate))
  );

  const result = await db
    .with(goalsCreatedUpToWeek, goalCompletionInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        sql/*sql*/ `(SELECT COUNT(*) FROM ${goalCompletionInWeek})`.mapWith(
          Number
        ),
      total:
        sql/*sql*/ `(SELECT SUM(${goalsCreatedUpToWeek.desireWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql/*sql*/ `
          JSON_OBJECT_AGG(
            ${goalsCompletedByWeekDay.completedAtDate},
            ${goalsCompletedByWeekDay.completions}
          )  
        `,
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result[0],
  };
}
