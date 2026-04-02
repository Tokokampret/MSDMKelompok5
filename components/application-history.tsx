"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Application {
  id: string
  position: string
  date: string
  status: string
  statusType: "info" | "success" | "warning" | "default"
}

interface ApplicationHistoryProps {
  applications: Application[]
  onViewDetail?: (id: string) => void
}

const statusColors: Record<string, string> = {
  info: "bg-[#0078c2] text-white hover:bg-[#00609D]",
  success: "bg-emerald-500 text-white hover:bg-emerald-600",
  warning: "bg-amber-500 text-white hover:bg-amber-600",
  default: "bg-gray-500 text-white hover:bg-gray-600",
}

export function ApplicationHistory({ applications, onViewDetail }: ApplicationHistoryProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  const totalPages = Math.ceil(applications.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentApplications = applications.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="text-[#00609D] font-semibold">
                <button className="flex items-center gap-1 hover:text-[#0078c2]">
                  Posisi <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#00609D] font-semibold">
                <button className="flex items-center gap-1 hover:text-[#0078c2]">
                  Tanggal Daftar <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#00609D] font-semibold">
                <button className="flex items-center gap-1 hover:text-[#0078c2]">
                  Tahapan Terakhir <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentApplications.map((app) => (
              <TableRow key={app.id} className="bg-white hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {app.position}
                </TableCell>
                <TableCell className="text-gray-600">
                  {app.date}
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-medium",
                    statusColors[app.statusType]
                  )}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetail?.(app.id)}
                    className="text-[#00609D] hover:text-[#0078c2] hover:bg-[#00609D]/10"
                    aria-label={`View details for ${app.position}`}
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Select 
            value={pageSize.toString()} 
            onValueChange={(value) => {
              setPageSize(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>
            Results: {startIndex + 1} - {Math.min(endIndex, applications.length)} of {applications.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "w-8 h-8",
                  currentPage === pageNum && "bg-[#00609D] text-white hover:bg-[#0078c2]"
                )}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Application Detail Component
interface ApplicationDetail {
  position: string
  registrationDate: string
  history: {
    id: string
    date: string
    stage: string
    type: string
  }[]
}

interface ApplicationDetailViewProps {
  detail: ApplicationDetail
}

export function ApplicationDetailView({ detail }: ApplicationDetailViewProps) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Posisi</p>
          <p className="text-[#00609D] font-bold text-xl">{detail.position}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Tanggal Daftar</p>
          <p className="text-[#00609D] font-bold text-xl">{detail.registrationDate}</p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="text-[#00609D] font-semibold">
                <button className="flex items-center gap-1 hover:text-[#0078c2]">
                  Terakhir Diperbarui <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#00609D] font-semibold">
                <button className="flex items-center gap-1 hover:text-[#0078c2]">
                  Tahapan Terakhir <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#00609D] font-semibold">
                <button className="flex items-center gap-1 hover:text-[#0078c2]">
                  Posisi <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.history.map((item) => (
              <TableRow key={item.id} className="bg-white hover:bg-gray-50">
                <TableCell className="text-gray-600">
                  {item.date}
                </TableCell>
                <TableCell className="text-gray-900 font-medium">
                  {item.stage}
                </TableCell>
                <TableCell className="text-gray-600">
                  {item.type}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
