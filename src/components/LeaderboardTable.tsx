
import { ParticipantData } from "@/pages/Index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaderboardTableProps {
  participants: ParticipantData[];
}

const LeaderboardTable = ({ participants }: LeaderboardTableProps) => {
  return (
    <div className="overflow-x-auto">
      {participants.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">排名</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead className="text-right">杯數</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow 
                key={participant.id}
                className="animate-in fade-in-50 duration-300"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{participant.name}</TableCell>
                <TableCell className="text-right font-semibold">{participant.cups}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          尚無數據，請新增資料
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
