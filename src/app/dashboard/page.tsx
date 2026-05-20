"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MOCK_WORKOUTS = [
  { id: 1, name: "Squat", sets: 3, reps: 5, weight: 100 },
  { id: 2, name: "Bench Press", sets: 3, reps: 5, weight: 80 },
  { id: 3, name: "Deadlift", sets: 1, reps: 5, weight: 140 },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Workout Log</h1>

      <div className="mb-8">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-50 justify-start gap-2">
              <CalendarIcon className="h-4 w-4" />
              {format(date, "do MMM yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                if (d) {
                  setDate(d);
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Workouts for {format(date, "do MMM yyyy")}
        </h2>

        {MOCK_WORKOUTS.length === 0 ? (
          <p className="text-muted-foreground text-sm">No workouts logged for this date.</p>
        ) : (
          MOCK_WORKOUTS.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-1 pt-4 px-4">
                <CardTitle className="text-base">{workout.name}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  {workout.sets} sets × {workout.reps} reps @ {workout.weight} kg
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
