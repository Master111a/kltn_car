import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    // State để lưu thông tin form
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        accessories: {
            wheels: "",
            glass: "",
            color: "",
            engine: "",
        },
    });
    // State để hiển thị thông báo lỗi
    const [error, setError] = useState("");

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.accessories) {
            setFormData((prev) => ({
                ...prev,
                accessories: { ...prev.accessories, [name]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleAddCar = (newCar) => {
        console.log(newCar);
    };
    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra validation
        if (!formData.name || !formData.price) {
            setError("Please fill in basic information (Name and Price).");
            return;
        }

        // Tạo sản phẩm mới
        const newCar = {
            id: Date.now(), // ID tạm thời
            name: formData.name,
            price: parseFloat(formData.price) || 0,
            image: formData.image || "",
            accessories: {
                wheels: formData.accessories.wheels || "Standard",
                glass: formData.accessories.glass || "Standard",
                color: formData.accessories.color || "Default",
                engine: formData.accessories.engine || "Standard",
            },
        };

        // Gọi hàm onAddCar để thêm sản phẩm vào danh sách
        handleAddCar(newCar);

        // Reset form và điều hướng về trang danh sách
        setFormData({
            name: "",
            price: "",
            image: "",
            accessories: { wheels: "", glass: "", color: "", engine: "" },
        });
        setError("");
        navigate("/cars");
    };

    return (
        <div className="min-h-screen bg-green-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Add New Car
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
                            className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter car name"
                        />
                    </div>

                    {/* Trường Giá */}
                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter price"
                        />
                    </div>

                    {/* Trường Hình ảnh */}
                    <div className="mb-4">
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700">
                            Image URL (Optional)
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter image URL"
                        />
                    </div>

                    {/* Trường Phụ kiện */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Accessories
                        </label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <label
                                    htmlFor="wheels"
                                    className="block text-sm text-gray-600">
                                    Wheels
                                </label>
                                <input
                                    type="text"
                                    id="wheels"
                                    name="wheels"
                                    value={formData.accessories.wheels}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter wheel type"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="glass"
                                    className="block text-sm text-gray-600">
                                    Glass
                                </label>
                                <input
                                    type="text"
                                    id="glass"
                                    name="glass"
                                    value={formData.accessories.glass}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter glass type"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="color"
                                    className="block text-sm text-gray-600">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={formData.accessories.color}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter color"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="engine"
                                    className="block text-sm text-gray-600">
                                    Engine
                                </label>
                                <input
                                    type="text"
                                    id="engine"
                                    name="engine"
                                    value={formData.accessories.engine}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter engine type"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nút Submit và Hủy */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate("/cars")}
                            className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
