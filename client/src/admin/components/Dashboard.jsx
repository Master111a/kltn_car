// src/Dashboard.jsx
import { useState, useEffect } from "react";
import { FaCar, FaFile, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

// Dữ liệu giả lập (mock data)
const mockData = {
    users: 150, // Số lượng người dùng
    products: 300, // Số lượng sản phẩm
    orders: 120, // Số lượng đơn hàng
    reports: 45, // Số lượng báo cáo
};

export default function Dashboard() {
    // State để lưu dữ liệu thống kê
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        reports: 0,
    });

    // Giả lập lấy dữ liệu từ API (dùng useEffect)
    useEffect(() => {
        // Thay thế bằng API call thực tế nếu có
        setTimeout(() => {
            setStats(mockData);
        }, 1000); // Giả lập độ trễ 1 giây
    }, []);

    return (
        <div className="h-full bg-blue-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Dashboard Thống Kê
            </h1>

            {/* Cards hiển thị số liệu */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Card Người dùng */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FaUser className="text-blue-600 text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Người dùng
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.users}
                        </p>
                        <Link
                            to="/admin-account"
                            className="text-blue-500 hover:underline">
                            Xem chi tiết
                        </Link>
                    </div>
                </div>

                {/* Card Sản phẩm */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCar className="text-green-600 text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Sản phẩm
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.products}
                        </p>
                        <Link
                            to="/admin-product"
                            className="text-blue-500 hover:underline">
                            Xem chi tiết
                        </Link>
                    </div>
                </div>

                {/* Card Đơn hàng */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <FaShoppingCart className="text-yellow-600 text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Đơn hàng
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.orders}
                        </p>
                        <Link
                            to="/orders"
                            className="text-blue-500 hover:underline">
                            Xem chi tiết
                        </Link>
                    </div>
                </div>

                {/* Card Báo cáo */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaFile className="text-red-600 text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Báo cáo
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.reports}
                        </p>
                        <Link
                            to="/reports"
                            className="text-blue-500 hover:underline">
                            Xem chi tiết
                        </Link>
                    </div>
                </div>
            </div>

            {/* Biểu đồ đơn giản (giả lập) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Biểu đồ số lượng người dùng theo thời gian */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-black">
                        Người dùng theo thời gian
                    </h3>
                    <div className="h-64 flex items-end space-x-2">
                        {/* Giả lập cột biểu đồ */}
                        <div className="w-1/5 bg-blue-500 h-32"></div>
                        <div className="w-1/5 bg-blue-500 h-48"></div>
                        <div className="w-1/5 bg-blue-500 h-40"></div>
                        <div className="w-1/5 bg-blue-500 h-56"></div>
                        <div className="w-1/5 bg-blue-500 h-64"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Biểu đồ giả lập (Tháng 1 - Tháng 5)
                    </p>
                </div>

                {/* Biểu đồ đơn hàng theo trạng thái */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-black">
                        Đơn hàng theo trạng thái
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                        {/* Giả lập biểu đồ tròn */}
                        <div className="relative w-40 h-40">
                            <div
                                className="absolute inset-0 bg-yellow-500 rounded-full"
                                style={{
                                    clipPath: "circle(50% at 50% 50%)",
                                }}></div>
                            <div
                                className="absolute inset-0 bg-yellow-300 rounded-full"
                                style={{
                                    clipPath: "circle(40% at 50% 50%)",
                                }}></div>
                            <div
                                className="absolute inset-0 bg-yellow-100 rounded-full"
                                style={{
                                    clipPath: "circle(30% at 50% 50%)",
                                }}></div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Biểu đồ giả lập (Đang xử lý, Hoàn thành, Hủy)
                    </p>
                </div>
            </div>
        </div>
    );
}
