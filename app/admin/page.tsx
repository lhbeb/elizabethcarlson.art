'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, PlusCircle, Box, LogOut } from 'lucide-react'

export default function AdminPage() {
    const router = useRouter()

    async function handleSignOut() {
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 text-[#2563eb] text-sm font-semibold mb-3 uppercase">
                        <LayoutDashboard size={15} />
                        Admin Panel
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Dashboard</h1>
                    <p className="text-gray-400">Manage your digital products from here.</p>
                </div>

                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 bg-[#ffffff] hover:bg-[#d8e0ea] border border-[#d8e0ea] px-4 py-2 rounded-xl transition-colors"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Link href="/admin/upload" className="group bg-[#ffffff] border border-[#d8e0ea] hover:border-[#2563eb]/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2563eb]/10">
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb]/15 flex items-center justify-center mb-4 group-hover:bg-[#2563eb]/25 transition-colors">
                        <PlusCircle size={20} className="text-[#2563eb]" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#2563eb] transition-colors">Add Product</h2>
                    <p className="text-sm text-gray-500">Create a new digital product listing</p>
                </Link>

                <Link href="/admin/manage" className="group bg-[#ffffff] border border-[#d8e0ea] hover:border-[#2563eb]/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2563eb]/10">
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb]/15 flex items-center justify-center mb-4 group-hover:bg-[#2563eb]/25 transition-colors">
                        <Box size={20} className="text-[#2563eb]" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#2563eb] transition-colors">Manage Products</h2>
                    <p className="text-sm text-gray-500">View, edit and delete your products</p>
                </Link>
            </div>
        </div>
    )
}
