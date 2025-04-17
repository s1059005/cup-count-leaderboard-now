import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

interface CupCountFormProps {
  onAddParticipant: (name: string, cups: number, code: string) => void;
}

const CupCountForm = ({ onAddParticipant }: CupCountFormProps) => {
  const [name, setName] = useState("");
  const [cups, setCups] = useState("");
  const [code, setCode] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

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

    if (!code.trim()) {
      toast.error("請輸入編號");
      return;
    }

    onAddParticipant(name.trim(), cupsNumber, code.trim());
    toast.success("資料已新增");
    
    // Reset form
    setName("");
    setCups("");
    setCode("");
    
    // Focus back to name input
    nameInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <div>
          <Label htmlFor="name" className="text-sm">姓名</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入姓名"
            className="mt-1 h-8"
            ref={nameInputRef}
            autoFocus
          />
        </div>
        
        <div>
          <Label htmlFor="cups" className="text-sm">杯數</Label>
          <Input
            id="cups"
            type="number"
            min="1"
            value={cups}
            onChange={(e) => setCups(e.target.value)}
            placeholder="請輸入杯數"
            className="mt-1 h-8"
          />
        </div>

        <div>
          <Label htmlFor="code" className="text-sm">編號</Label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="請輸入編號"
            className="mt-1 h-8"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full h-8 text-sm">
        新增資料
      </Button>
    </form>
  );
};

export default CupCountForm;
