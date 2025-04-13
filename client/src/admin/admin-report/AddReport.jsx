// src/AddReport.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddReport() {
    const navigate = useNavigate();
    const handleAddReport = (newReport) => {
        console.log(newReport);
    };
    // State để lưu thông tin form
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0], // Ngày mặc định là hôm nay
        status: "Open", // Trạng thái mặc định
    });

    // State để hiển thị thông báo lỗi
    const [error, setError] = useState("");

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra validation
        if (!formData.title || !formData.content) {
            setError("Please fill in the title and content completely.");
            return;
        }

        // Tạo báo cáo mới
        const newReport = {
            id: Date.now(), // ID tạm thời
            title: formData.title,
            content: formData.content,
            date: formData.date,
            status: formData.status,
        };

        // Gọi hàm onAddReport để thêm báo cáo vào danh sách
        handleAddReport(newReport);

        // Reset form và điều hướng về trang danh sách
        setFormData({
            title: "",
            content: "",
            date: new Date().toISOString().split("T")[0],
            status: "Open",
        });
        setError("");
        navigate("/reports");
    };

    return (
        <div className="h-full p-6 relative bg-amber-50">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Add Report
            </h1>

            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Trường Tiêu đề */}
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-base font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter report title"
                        />
                    </div>

                    {/* Trường Nội dung */}
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-base font-semibold text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter report content"
                            rows="4"
                        />
                    </div>

                    {/* Trường Ngày tạo */}
                    <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-base font-semibold text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Trường Trạng thái */}
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
                            <option value="Open">Open</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    {/* Nút Submit và Hủy */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
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
