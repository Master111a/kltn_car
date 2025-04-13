import { Outlet } from "react-router-dom";

export default function Content() {
    return (
        <div className="w-4/5 flex flex-col justify-start relative">
            <Outlet />
        </div>
    );
}
