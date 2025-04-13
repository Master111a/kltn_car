import { NavLink } from "react-router-dom";

export default function AsideBar() {
    const dashboardList = [
        { href: "", title: "Dashboard" },
        { href: "admin-account", title: "Account" },
        { href: "admin-product", title: "Product" },
        { href: "admin-order", title: "Order" },
        { href: "admin-report", title: "Report" },
    ];
    return (
        <div className="w-1/5 px-4 flex flex-col bg-black/80 justify-start">
            <ul className="self-stretch h-full flex flex-col gap-2">
                {dashboardList.map((item, index) => (
                    <li key={index} className="fl">
                        <NavLink
                            to={item?.href}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-300 font-extrabold block w-full"
                                    : "font-normal block w-full"
                            }>
                            <span className="flex-1 my-1 text-base">
                                {item?.title}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
