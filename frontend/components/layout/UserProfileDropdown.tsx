"use client"

import { useRouter } from "next/navigation"
import { LogOut, ChevronsUpDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfileDropdownProps {
    name: string
    initial: string
    roleLabel?: string
}

export default function UserProfileDropdown({ name, initial, roleLabel }: UserProfileDropdownProps) {
    const router = useRouter()

    const handleLogout = () => {
        // Clear session
        localStorage.clear()
        // Redirect to landing page
        router.push('/')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors outline-none">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {initial}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-medium text-gray-700 leading-none">{name}</span>
                        {roleLabel && <span className="text-xs text-gray-500 mt-0.5">{roleLabel}</span>}
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-gray-400 ml-1" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
