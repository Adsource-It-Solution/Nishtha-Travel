import { Bed, BookOpen, Car, Globe, Home, MessageCircle, Newspaper, Package, Plane, Tag, Train, Users } from "lucide-react"
import { Link } from "react-router-dom"

type SidebarProps = {
    closeSidebar?: () => void;
};

export function Sidebar({ closeSidebar }: SidebarProps) {

    return (
        <div>

            <div className="p-4 space-y-2 mt-10">

                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-black uppercase">Content</h3>
                    <div className="border-b-2 border-gray-300" />
                    <Link
                        to="/admin"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Home />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/flights"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white/ hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Plane />
                        <span>Flights</span>
                    </Link>

                    <Link
                        to="/admin/hotels"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Bed />
                        <span>Hotels</span>
                    </Link>

                    <Link
                        to="/admin/packages"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Package />
                        <span>Holiday Packages</span>
                    </Link>

                    <Link
                        to="/admin/destinations"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Globe />
                        <span>Destinations</span>
                    </Link>

                    <Link
                        to="/admin/cabs"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Car />
                        <span>Cabs</span>
                    </Link>

                    <Link
                        to="/admin/trains"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Train />
                        <span>Trains</span>
                    </Link>

                    <Link
                        to="/admin/blogs"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Newspaper />
                        <span>Blogs</span>
                    </Link>

                    <Link
                        to="/admin/offers"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Tag />
                        <span>Offers</span>
                    </Link>
                </div>
                <div className="border-b-2 border-gray-300" />
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-black uppercase">Management</h3>

                    <Link
                        to="/admin/bookings"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <BookOpen />
                        <span>Bookings</span>
                    </Link>

                    <Link
                        to="/admin/enquiries"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <MessageCircle />
                        <span>Enquiries</span>
                    </Link>

                    <Link
                        to="/admin/customers"
                        onClick={closeSidebar}
                        className="flex items-center gap-3 text-black hover:text-white hover:bg-gray-700/30 px-2 py-2 rounded"
                    >
                        <Users />
                        <span>Customers</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}