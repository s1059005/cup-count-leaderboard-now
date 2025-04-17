
import { useState } from "react";
import { ParticipantData } from "@/pages/Index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeaderboardTableProps {
  participants: ParticipantData[];
}

const LeaderboardTable = ({ participants }: LeaderboardTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 items per page
  
  const totalPages = Math.ceil(participants.length / itemsPerPage);
  
  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = participants.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="h-[350px] overflow-auto">
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
              {currentItems.map((participant, index) => (
                <TableRow 
                  key={participant.id}
                  className="animate-in fade-in-50 duration-300"
                >
                  <TableCell className="font-medium">{indexOfFirstItem + index + 1}</TableCell>
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
      </ScrollArea>
      
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink 
                  isActive={currentPage === number} 
                  onClick={() => paginate(number)}
                  className="cursor-pointer"
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default LeaderboardTable;
