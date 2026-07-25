import { Menu, User } from "lucide-react"


export const Header = () => {

    return (
        <header className="fixed top-0 right-0 h-14 w-full z-50 bg-white">
            <div className="flex items-center justify-between h-full px-6">

                <button className="text-gray-600 hover:text-gray-900">
                    <Menu />
                </button>

                <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>

                <button className="text-gray-600 hover:text-gray-900">
                    <User />
                </button>
            </div>
        </header>
    )
}

