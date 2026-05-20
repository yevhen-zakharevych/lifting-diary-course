import { auth } from "@clerk/nextjs/server";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "./_components/date-picker";
import { getWorkoutsForDate } from "@/data/workouts";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { date: dateParam } = await searchParams;
  const date = dateParam ? parseISO(dateParam) : new Date();

  const workouts = await getWorkoutsForDate(userId, date);

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Workout Log</h1>

      <div className="mb-8">
        <DatePicker selected={date} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Workouts for {format(date, "do MMM yyyy")}
        </h2>

        {workouts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No workouts logged for this date.</p>
        ) : (
          workouts.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-1 pt-4 px-4">
                <CardTitle className="text-base">{workout.name}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-1">
                {workout.workoutExercises.map((we) => (
                  <div key={we.id}>
                    <p className="text-sm font-medium">{we.exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {we.sets
                        .map((s) => `${s.reps} reps${s.weightKg ? ` @ ${s.weightKg} kg` : ""}`)
                        .join(" · ")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
