// src/AddOrder.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddOrder() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    // Danh sách trạng thái đơn hàng
    const orderStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];
    useEffect(() => {
        //  goi API list Card
        setCars([""]);
    }, []);

    // State để lưu thông tin form
    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        carId: "", // ID của ô tô được chọn
        totalPrice: 0, // Tổng giá sẽ được tính dựa trên ô tô được chọn
        orderDate: new Date().toISOString().split("T")[0], // Ngày đặt hàng mặc định là hôm nay
        status: "Pending", // Trạng thái mặc định
    });

    // State để hiển thị thông báo lỗi
    const [error, setError] = useState("");

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "carId") {
            // Tìm ô tô được chọn để cập nhật tổng giá
            const selectedCar = cars?.find(
                (car) => car?.id === parseInt(value)
            );
            setFormData((prev) => ({
                ...prev,
                carId: value,
                totalPrice: selectedCar ? selectedCar.price : 0,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleAddOrder = (newOrder) => {
        console.log(newOrder);
    };
    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra validation
        if (
            !formData.customerName ||
            !formData.customerEmail ||
            !formData.carId
        ) {
            setError(
                "Please fill in all information (Customer Name, Email, Product)."
            );
            return;
        }

        // Kiểm tra định dạng email cơ bản
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.customerEmail)) {
            setError("Invalid email.");
            return;
        }

        // Tạo đơn hàng mới
        const newOrder = {
            id: Date.now(), // ID tạm thời
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            carId: parseInt(formData.carId),
            totalPrice: parseFloat(formData.totalPrice),
            orderDate: formData.orderDate,
            status: formData.status,
        };

        // Gọi hàm onAddOrder để thêm đơn hàng vào danh sách
        handleAddOrder(newOrder);

        // Reset form và điều hướng về trang danh sách đơn hàng
        setFormData({
            customerName: "",
            customerEmail: "",
            carId: "",
            totalPrice: 0,
            orderDate: new Date().toISOString().split("T")[0],
            status: "Pending",
        });
        setError("");
        navigate("/admin/admin-order");
    };

    return (
        <div className="h-full p-6 relative bg-amber-50">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Add Order
            </h1>

            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Trường Tên khách hàng */}
                    <div className="mb-4">
                        <label
                            htmlFor="customerName"
                            className="block text-base font-semibold text-gray-700">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter customer name"
                        />
                    </div>

                    {/* Trường Email khách hàng */}
                    <div className="mb-4">
                        <label
                            htmlFor="customerEmail"
                            className="block text-base font-semibold text-gray-700">
                            Customer Email
                        </label>
                        <input
                            type="email"
                            id="customerEmail"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter customer email"
                        />
                    </div>

                    {/* Trường Chọn sản phẩm (ô tô) */}
                    <div className="mb-4">
                        <label
                            htmlFor="carId"
                            className="block text-base font-semibold text-gray-700">
                            Select Car
                        </label>
                        <select
                            id="carId"
                            name="carId"
                            value={formData.carId}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select a car</option>
                            {cars.length > 0 &&
                                cars?.map((car) => (
                                    <option key={car?.id} value={car?.id}>
                                        {car?.name} ($
                                        {car?.price?.toLocaleString()})
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Trường Tổng giá (chỉ đọc) */}
                    <div className="mb-4">
                        <label
                            htmlFor="totalPrice"
                            className="block text-base font-semibold text-gray-700">
                            Total Price ($)
                        </label>
                        <input
                            type="text"
                            id="totalPrice"
                            name="totalPrice"
                            value={formData.totalPrice.toLocaleString()}
                            readOnly
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                    </div>

                    {/* Trường Ngày đặt hàng */}
                    <div className="mb-4">
                        <label
                            htmlFor="orderDate"
                            className="block text-base font-semibold text-gray-700">
                            Order Date
                        </label>
                        <input
                            type="date"
                            id="orderDate"
                            name="orderDate"
                            value={formData.orderDate}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Trường Trạng thái đơn hàng */}
                    <div className="mb-4">
                        <label
                            htmlFor="status"
                            className="block text-base font-semibold text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            {orderStatuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nút Submit và Hủy */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                            className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
