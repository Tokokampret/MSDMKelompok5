"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  sender: string
  senderLogo?: string
  date: string
  content: string
  isFromCompany: boolean
}

interface MessagesSectionProps {
  messages: Message[]
}

export function MessagesSection({ messages }: MessagesSectionProps) {
  const [newMessage, setNewMessage] = React.useState("")

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-gray-900">EXAMINE INDUSTRY RECRUITMENT</span>
        </div>
        <Button variant="ghost" size="icon" className="text-[#00609D]">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#00609D]">
            <Plus className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Tulis pesan anda..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button 
            size="icon" 
            className="bg-[#00609D] hover:bg-[#0078c2] text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={cn(
      "flex gap-3",
      message.isFromCompany ? "flex-row" : "flex-row-reverse"
    )}>
      {message.isFromCompany && (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={message.senderLogo} alt={message.sender} />
          <AvatarFallback className="bg-[#00609D] text-white text-xs">
            EI
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn(
        "max-w-[80%]",
        message.isFromCompany ? "" : "text-right"
      )}>
        {message.isFromCompany && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-gray-900">{message.sender}</span>
            <span className="text-xs text-gray-500">{message.date}</span>
          </div>
        )}

        <div className={cn(
          "rounded-xl p-4 text-sm",
          message.isFromCompany 
            ? "bg-gray-100 text-gray-800 rounded-tl-none" 
            : "bg-[#00609D] text-white rounded-tr-none"
        )}>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>

        {!message.isFromCompany && (
          <span className="text-xs text-gray-500 mt-1 block">{message.date}</span>
        )}
      </div>
    </div>
  )
}

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: "1",
    sender: "EXAMINE INDUSTRY RECRUITMENT",
    date: "31/03 2026 14:16 (UTC+7)",
    content: `Yth. Sdr/Sdri. CRISTIANO RONALDO

Terima kasih atas kesediaan Anda untuk mengikuti proses seleksi Examine Industry. Sehubungan dengan hal tersebut, kami informasikan bahwa lamaran Anda saat ini masih dalam proses.
Mohon menunggu pemberitahuan selanjutnya. Terima kasih.

Catatan:
- Proses rekrutmen dan seleksi Examine Industry tidak dipungut biaya apapun.
- Pemberitahuan ini bersifat satu arah, mohon untuk tidak membalas email ini.

Salam,
Rekrutmen Examine Industry`,
    isFromCompany: true,
  },
  {
    id: "2",
    sender: "EXAMINE INDUSTRY RECRUITMENT",
    date: "31 Maret 2026",
    content: `Mohon menunggu email selanjutnya berisi durasi pengerjaan tes yang sudah ditentukan. Silakan mengerjakan dan menyelesaikannya dalam durasi waktu tersebut.

Terima kasih.

Salam,
Rekrutmen Examine Industry`,
    isFromCompany: true,
  },
]
