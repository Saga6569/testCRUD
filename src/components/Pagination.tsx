import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
 page: number
 pageSize: number
 totalPages: number
 totalItems: number
 onPageChange: (page: number) => void
 onPageSizeChange: (size: number) => void
}

const Pagination = ({
 page,
 pageSize,
 totalPages,
 totalItems,
 onPageChange,
 onPageSizeChange,
}: PaginationProps) => {
 const canPrev = page > 1
 const canNext = page < totalPages

 const handlePrev = () => {
  if (canPrev) onPageChange(page - 1)
 }

 const handleNext = () => {
  if (canNext) onPageChange(page + 1)
 }

 return (
  <div className="mt-4 flex items-center justify-between gap-4">
   <div className="text-sm text-gray-600">
    Показано {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, totalItems)}{' '}
    из {totalItems}
   </div>
   <div className="flex items-center gap-3">
    <select
     className="input"
     value={pageSize}
     onChange={(e) => onPageSizeChange(Number(e.target.value))}
    >
     {[5, 10, 20, 50].map((size) => (
      <option key={size} value={size}>
       {size} на странице
      </option>
     ))}
    </select>

    <div className="flex items-center  gap-1">
     <button
      className="btn ghost p-2 disabled:opacity-50"
      onClick={handlePrev}
      disabled={!canPrev}
      aria-label="Предыдущая страница"
     >
      <ChevronLeft className="h-4 w-4" />
     </button>
     <div className="px-2 text-sm text-gray-700 inline-flex items-center whitespace-nowrap">
      {page} / {totalPages}
     </div>
     <button
      className="btn ghost p-2 disabled:opacity-50"
      onClick={handleNext}
      disabled={!canNext}
      aria-label="Следующая страница"
     >
      <ChevronRight className="h-4 w-4" />
     </button>
    </div>
   </div>
  </div>
 )
}

export default Pagination
