import Link from "next/link"

export default function DashboardLayout ({ children }: {children: React.ReactNode}) {
    return (
        <>
        <nav className="flex flex-row mt-10 gap-10 justify-center items-center">
          <Link className="w-[300px] justify-center text-[white] rounded-md bg-[#5A3BC3] px-5 py-2.5 text-center text-xl font-medium hover:text-black hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300" href="/dashboard">Profile</Link>
          <Link className="w-[300px] justify-center text-[white] rounded-md bg-[#5A3BC3] px-5 py-2.5 text-center text-xl font-medium hover:text-black hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300" href="/dashboard/orders">Orders</Link>
        </nav>
          <main className="bg-[white] m-20 border border-gray-200 rounded-lg overflow-hidden">{children}</main>
        </>
    )
}