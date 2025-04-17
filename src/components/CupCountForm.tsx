
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

interface CupCountFormProps {
  onAddParticipant: (name: string, cups: number) => void;
}

const CupCountForm = ({ onAddParticipant }: CupCountFormProps) => {
  const [name, setName] = useState("");
  const [cups, setCups] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("請輸入姓名");
      return;
    }
    
    const cupsNumber = parseInt(cups);
    if (isNaN(cupsNumber) || cupsNumber <= 0) {
      toast.error("請輸入有效的杯數");
      return;
    }

    onAddParticipant(name.trim(), cupsNumber);
    toast.success("資料已新增");
    
    // Reset form
    setName("");
    setCups("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">姓名</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="請輸入姓名"
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="cups">杯數</Label>
        <Input
          id="cups"
          type="number"
          min="1"
          value={cups}
          onChange={(e) => setCups(e.target.value)}
          placeholder="請輸入杯數"
          className="mt-1"
        />
      </div>
      
      <Button type="submit" className="w-full">
        新增資料
      </Button>
    </form>
  );
};

export default CupCountForm;
