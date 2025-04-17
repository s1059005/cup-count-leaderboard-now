
import { useState } from "react";
import CupCountForm from "@/components/CupCountForm";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ParticipantData {
  id: string;
  name: string;
  cups: number;
}

const Index = () => {
  const [participants, setParticipants] = useState<ParticipantData[]>([]);

  const addParticipant = (name: string, cups: number) => {
    const newParticipant: ParticipantData = {
      id: Date.now().toString(),
      name,
      cups,
    };
    
    setParticipants((prev) => {
      const updated = [...prev, newParticipant];
      // Sort by cups count in descending order
      return updated.sort((a, b) => b.cups - a.cups);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">杯數排行榜</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>輸入資料</CardTitle>
            </CardHeader>
            <CardContent>
              <CupCountForm onAddParticipant={addParticipant} />
            </CardContent>
          </Card>

          {/* Leaderboard Section */}
          <Card>
            <CardHeader>
              <CardTitle>排行榜</CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable participants={participants} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
