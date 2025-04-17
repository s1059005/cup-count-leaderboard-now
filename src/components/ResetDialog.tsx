import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { ParticipantData } from '@/pages/Index';

interface ResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  participants: ParticipantData[];
  onRestore: (data: ParticipantData[]) => void;
}

const ResetDialog: React.FC<ResetDialogProps> = ({
  isOpen,
  onClose,
  onReset,
  participants,
  onRestore
}) => {
  const [password, setPassword] = React.useState("");

  const handleDownload = () => {
    const dataStr = JSON.stringify(participants);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cup-count-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('備份檔案已下載');
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ParticipantData[];
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }
        onRestore(data);
        toast.success('資料已還原');
        onClose();
      } catch (error) {
        toast.error('無效的備份檔案');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (password === 'ken') {
      onReset();
      setPassword('');
      toast.success('資料已重置');
      onClose();
    } else {
      toast.error('密碼錯誤');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>資料管理</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="w-full"
          >
            下載備份資料
          </Button>
          
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="backup" className="text-sm text-gray-600">
              上傳備份資料
            </label>
            <Input
              id="backup"
              type="file"
              accept=".json"
              onChange={handleUpload}
              className="cursor-pointer"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="text-sm text-gray-600">
              輸入密碼以重置資料
            </label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入重置密碼"
              />
              <Button 
                variant="destructive"
                onClick={handleReset}
              >
                重置
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetDialog; 