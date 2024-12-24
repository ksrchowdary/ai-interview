// import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";

export const NumberOfQuestionsWidget = () => {
  // Placeholder data for the number of questions
  const numberOfQuestions = 25; // This should be fetched from your data source

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Number of Interviews
        </CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{numberOfQuestions}</div>
        <p className="text-xs text-muted-foreground">+12% from last week</p>
      </CardContent>
    </Card>
  );
};
