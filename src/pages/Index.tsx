import { useState, useEffect } from "react";
import CupCountForm from "@/components/CupCountForm";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export interface ParticipantData {
  id: string;
  name: string;
  cups: number;
  code: string;
}

const STORAGE_KEY = 'cup-count-participants';

const Index = () => {
  const [participants, setParticipants] = useState<ParticipantData[]>(() => {
    // 從 localStorage 讀取初始數據
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // 當數據變更時保存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  }, [participants]);

  const addParticipant = (name: string, cups: number, code: string) => {
    const newParticipant: ParticipantData = {
      id: Date.now().toString(),
      name,
      cups,
      code
    };
    
    setParticipants((prev) => {
      const updated = [...prev, newParticipant];
      // Sort by cups count in descending order
      return updated.sort((a, b) => b.cups - a.cups);
    });
  };

  const handleReset = () => {
    const password = prompt('請輸入重置密碼：');
    if (password === 'ken') {
      setParticipants([]);
      toast.success('資料已重置');
    } else {
      toast.error('密碼錯誤');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">杯數排行榜</h1>
        
        <div className="grid md:grid-cols-4 gap-6">
          {/* Input Section - smaller, 1/4 of width */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">輸入資料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CupCountForm onAddParticipant={addParticipant} />
              <Button 
                variant="outline" 
                className="w-full h-8 text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleReset}
              >
                重置資料
              </Button>
            </CardContent>
          </Card>

          {/* Leaderboard Section - larger, 3/4 of width */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">排行榜</CardTitle>
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
