import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();
    const onAddUser = (user) => {
        console.log(user);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [error, setError] = useState("");
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
        if (!formData.name || !formData.email) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Kiểm tra định dạng email cơ bản
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Email không hợp lệ.");
            return;
        }

        // Tạo tài khoản mới
        const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
        };

        // Gọi hàm onAddUser để thêm tài khoản vào danh sách
        onAddUser(newUser);

        // Reset form và điều hướng về trang danh sách
        setFormData({ name: "", email: "" });
        setError("");
        navigate("/");
    };

    return (
        <div className="h-full p-6 relative bg-amber-50">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Thêm tài khoản mới
            </h1>

            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Trường Tên */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-base font-semibold text-gray-700">
                            Tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập tên"
                        />
                    </div>

                    {/* Trường Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-base font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block text-black/80 font-semibold w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập email"
                        />
                    </div>

                    {/* Nút Submit và Hủy */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded hover:bg-gray-400">
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
