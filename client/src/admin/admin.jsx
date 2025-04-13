import { Link } from "react-router-dom";
import AsideBar from "./components/AsideBar";
import Content from "./components/Content";

export default function Admin() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex items-center h-20 w-full py-4 bg-black">
                <Link
                    to="/"
                    className="w-1/5 px-4 self-stretch font-semibold flex text-2xl items-center">
                    3DCarConnect
                </Link>
                <div className="w-4/5 px-4 self-stretch">Search</div>
            </div>
            <div className="flex grow">
                <AsideBar />
                <Content />
            </div>
        </div>
    );
}
