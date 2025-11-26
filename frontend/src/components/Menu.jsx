import React, { useContext } from "react";
import { AppContent } from "../context/AppContext.jsx";
import { useNavigate, useLocation,} from "react-router-dom";
import {
    PlusCircle,
    ListOrdered,
    Wallet,
    LayoutGrid,
    BarChart3,
    Settings,
    LayoutDashboard,
    TrendingDownIcon,
    TrendingUpIcon,
} from "lucide-react";

const Menu = () => {

    const { userData } = useContext(AppContent);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashbord", path: "/dashboard", icon: <TrendingUpIcon size={20} /> },
        { name: "Add Transaction", path: "/add-transaction", icon: <PlusCircle size={20} /> },
        { name: "Transactions", path: "/transactions", icon: <ListOrdered size={20} /> },
        { name: "Budget and Categories", path: "/budgetandcategories", icon: <Wallet size={20} /> },
        // { name: "Report", path: "/report", icon: <BarChart3 size={20} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="w-1/4 bg-gray-950 flex flex-col mr-4 p-5">
            <h2 className="text-2xl font-semibold text-violet-500 mb-4">Menu</h2>
            <ul className="text-white space-y-3">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-3 cursor-pointer pb-2 border-b-2 transition-all duration-300 ${location.pathname === item.path
                            ? "border-violet-600 text-violet-300"
                            : "border-transparent hover:text-violet-500"
                            }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Menu;
