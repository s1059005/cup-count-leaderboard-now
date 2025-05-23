import { useState, useEffect } from "react";
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
  
  // Calculate totalPages properly
  const totalPages = Math.max(1, Math.ceil(participants.length / itemsPerPage));
  
  // Reset to page 1 if current page is greater than total pages (happens when items are removed)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);
  
  // Calculate the current items to display - fix indexing here
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, participants.length);
  const currentItems = participants.slice(indexOfFirstItem, indexOfLastItem);
  
  console.log({
    total: participants.length,
    currentPage,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem,
    currentItemsLength: currentItems.length
  });
  
  // Auto pagination every 10 seconds
  useEffect(() => {
    // Only start auto-pagination if we have enough items for multiple pages
    if (totalPages <= 1) return;
    
    const autoPaginationTimer = setInterval(() => {
      setCurrentPage((prevPage) => {
        // If we're on the last page, go back to the first page
        // Otherwise go to the next page
        return prevPage >= totalPages ? 1 : prevPage + 1;
      });
    }, 10000); // 10 seconds interval
    
    return () => {
      clearInterval(autoPaginationTimer); // Clean up on unmount
    };
  }, [totalPages]);
  
  // Change page manually
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="h-[480px] overflow-auto">
        {participants.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">排名</TableHead>
                <TableHead className="w-1/3">姓名</TableHead>
                <TableHead className="w-1/3 text-center">杯數</TableHead>
                <TableHead className="w-1/3">編號</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((participant, index) => (
                <TableRow 
                  key={participant.id}
                  className="animate-in fade-in-50 duration-300 even:bg-gray-100"
                >
                  <TableCell className="font-medium">{participants.findIndex(p => p.id === participant.id) + 1}</TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell className="text-center font-semibold">{participant.cups}</TableCell>
                  <TableCell>{participant.code}</TableCell>
                </TableRow>
              ))}
              {/* Add empty rows to ensure consistent height when not enough data */}
              {currentItems.length < itemsPerPage && Array(itemsPerPage - currentItems.length).fill(0).map((_, index) => (
                <TableRow key={`empty-${index}`} className="even:bg-gray-100">
                  <TableCell className="h-[41px]">&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
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
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            頁面 {currentPage} / {totalPages} (10秒自動換頁)
          </div>
          
          <Pagination>
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
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
