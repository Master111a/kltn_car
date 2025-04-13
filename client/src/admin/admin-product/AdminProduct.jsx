// src/AdminProduct.jsx
import { useEffect, useRef, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function AdminProduct() {
    const nameRef = useRef(null);

    // Dữ liệu giả lập cho sản phẩm ô tô
    const [cars, setCars] = useState([
        {
            id: 1,
            name: "Toyota Camry",
            price: 25000,
            image: "",
            accessories: {
                wheels: "18-inch Alloy",
                glass: "Tinted",
                color: "Black",
                engine: "2.5L 4-cylinder",
            },
        },
        {
            id: 2,
            name: "Honda Civic",
            price: 22000,
            image: "",
            accessories: {
                wheels: "17-inch Alloy",
                glass: "Standard",
                color: "White",
                engine: "1.5L Turbo",
            },
        },
        {
            id: 3,
            name: "Ford Mustang",
            price: 35000,
            image: "",
            accessories: {
                wheels: "19-inch Alloy",
                glass: "Tinted",
                color: "Red",
                engine: "5.0L V8",
            },
        },
        // Thêm dữ liệu để phù hợp với phân trang
        {
            id: 4,
            name: "BMW X5",
            price: 45000,
            image: "",
            accessories: {
                wheels: "20-inch Alloy",
                glass: "Tinted",
                color: "Blue",
                engine: "3.0L 6-cylinder",
            },
        },
        {
            id: 5,
            name: "Mercedes C-Class",
            price: 42000,
            image: "",
            accessories: {
                wheels: "18-inch Alloy",
                glass: "Standard",
                color: "Silver",
                engine: "2.0L Turbo",
            },
        },
        {
            id: 6,
            name: "Audi A4",
            price: 39000,
            image: "",
            accessories: {
                wheels: "19-inch Alloy",
                glass: "Tinted",
                color: "Black",
                engine: "2.0L Turbo",
            },
        },
        {
            id: 7,
            name: "Hyundai Tucson",
            price: 27000,
            image: "",
            accessories: {
                wheels: "17-inch Alloy",
                glass: "Standard",
                color: "Gray",
                engine: "2.4L 4-cylinder",
            },
        },
        {
            id: 8,
            name: "Kia Sorento",
            price: 30000,
            image: "",
            accessories: {
                wheels: "18-inch Alloy",
                glass: "Tinted",
                color: "Green",
                engine: "3.3L V6",
            },
        },
        {
            id: 9,
            name: "Tesla Model 3",
            price: 40000,
            image: "",
            accessories: {
                wheels: "19-inch Alloy",
                glass: "Tinted",
                color: "White",
                engine: "Electric",
            },
        },
    ]);

    // State để lưu thông tin sản phẩm được chọn
    const [selectedCar, setSelectedCar] = useState(null);
    // State để điều khiển modal xác nhận xóa
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // State để lưu sản phẩm cần xóa
    const [carToDelete, setCarToDelete] = useState(null);

    useEffect(() => {
        if (isEdit && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isEdit]);

    useEffect(() => {
        if (!selectedCar) setIsEdit(false);
    }, [selectedCar]);

    // Xử lý khi chọn một sản phẩm để xem thông tin
    const handleSelectCar = (car) => {
        setSelectedCar(car);
    };

    // Xử lý khi nhấn nút xóa
    const handleDeleteClick = (car) => {
        setCarToDelete(car);
        setShowModal(true);
    };

    // Xác nhận xóa sản phẩm
    const confirmDelete = () => {
        setCars(cars.filter((car) => car.id !== carToDelete.id));
        setShowModal(false);
        setCarToDelete(null);
        setSelectedCar(null);
    };

    // Hủy xóa
    const cancelDelete = () => {
        setShowModal(false);
        setCarToDelete(null);
    };

    // Xử lý chỉnh sửa sản phẩm
    const handleEditCar = () => {
        setCars(
            cars.map((car) => (car.id === selectedCar.id ? selectedCar : car))
        );
        setSelectedCar(null);
    };

    const handleCancelCar = () => {
        setSelectedCar(null);
    };

    return (
        <div className="h-full p-6 relative bg-green-50">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Manage Cars
            </h1>
            <Link
                to={"add-product"}
                className="flex items-center justify-center px-2 py-1 absolute top-4 left-4 font-medium bg-blue-400 gap-2 rounded-md cursor-pointer hover:bg-blue-500">
                <span>Add Product</span>
                <FaPlus />
            </Link>

            {/* Danh sách sản phẩm ô tô */}
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-black">List Cars</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price ($)</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car?.id} className="border-b text-black">
                                <td className="px-4 py-2 text-center">
                                    {car?.id}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {car?.name}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {car?.price.toLocaleString()}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <img
                                        src={
                                            car.image ||
                                            "https://via.placeholder.com/64"
                                        }
                                        alt="car"
                                        className="w-16 h-16 rounded-full overflow-hidden m-auto"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleSelectCar(car)}
                                        className="cursor-pointer text-blue-500 bg-white px-3 py-1 rounded mr-2 hover:text-blue-700">
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(car)}
                                        className="cursor-pointer text-red-500 bg-white px-3 py-1 rounded hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalPages={Math.ceil(cars.length / 3)} />
            </div>

            {/* Hiển thị thông tin sản phẩm được chọn */}
            {selectedCar && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="max-w-4xl w-4/5 mx-auto bg-white text-black/80 shadow-md rounded-lg p-6">
                        <h2 className="text-xl text-center font-semibold mb-4">
                            Car Information
                        </h2>
                        <div className="flex flex-col items-start justify-start gap-4">
                            {isEdit ? (
                                <>
                                    <p>
                                        <strong>ID:</strong> {selectedCar?.id}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <div className="grow">
                                            <strong>Name:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={selectedCar?.name}
                                                ref={nameRef}
                                                onChange={(e) =>
                                                    setSelectedCar((prev) => ({
                                                        ...prev,
                                                        name: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="grow">
                                            <strong>Price ($):</strong>{" "}
                                            <input
                                                type="number"
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={selectedCar?.price}
                                                onChange={(e) =>
                                                    setSelectedCar((prev) => ({
                                                        ...prev,
                                                        price:
                                                            parseFloat(
                                                                e.target.value
                                                            ) || 0,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <div className="grow">
                                            <strong>Wheels:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={
                                                    selectedCar?.accessories
                                                        .wheels
                                                }
                                                onChange={(e) =>
                                                    setSelectedCar((prev) => ({
                                                        ...prev,
                                                        accessories: {
                                                            ...prev.accessories,
                                                            wheels: e.target
                                                                .value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="grow">
                                            <strong>Glass:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={
                                                    selectedCar?.accessories
                                                        .glass
                                                }
                                                onChange={(e) =>
                                                    setSelectedCar((prev) => ({
                                                        ...prev,
                                                        accessories: {
                                                            ...prev.accessories,
                                                            glass: e.target
                                                                .value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <div className="grow">
                                            <strong>Color:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={
                                                    selectedCar?.accessories
                                                        .color
                                                }
                                                onChange={(e) =>
                                                    setSelectedCar((prev) => ({
                                                        ...prev,
                                                        accessories: {
                                                            ...prev.accessories,
                                                            color: e.target
                                                                .value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="grow">
                                            <strong>Engine:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={
                                                    selectedCar?.accessories
                                                        .engine
                                                }
                                                onChange={(e) =>
                                                    setSelectedCar((prev) => ({
                                                        ...prev,
                                                        accessories: {
                                                            ...prev.accessories,
                                                            engine: e.target
                                                                .value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <p>
                                        <strong>Image:</strong>{" "}
                                        <img
                                            src={
                                                selectedCar.image ||
                                                "https://via.placeholder.com/64"
                                            }
                                            alt="car"
                                            className="w-16 h-16 rounded-full overflow-hidden"
                                        />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>ID:</strong> {selectedCar?.id}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <p className="grow">
                                            <strong>Name:</strong>{" "}
                                            {selectedCar?.name}
                                        </p>
                                        <p className="grow">
                                            <strong>Price ($):</strong>{" "}
                                            {selectedCar?.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <p className="grow">
                                            <strong>Wheels:</strong>{" "}
                                            {selectedCar?.accessories.wheels}
                                        </p>
                                        <p className="grow">
                                            <strong>Glass:</strong>{" "}
                                            {selectedCar?.accessories.glass}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <p className="grow">
                                            <strong>Color:</strong>{" "}
                                            {selectedCar?.accessories.color}
                                        </p>
                                        <p className="grow">
                                            <strong>Engine:</strong>{" "}
                                            {selectedCar?.accessories.engine}
                                        </p>
                                    </div>
                                    <p>
                                        <strong>Image:</strong>{" "}
                                        <img
                                            src={
                                                selectedCar.image ||
                                                "https://via.placeholder.com/64"
                                            }
                                            alt="car"
                                            className="w-16 h-16 rounded-full overflow-hidden"
                                        />
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="mt-4 flex items-center justify-end w-full">
                            {isEdit ? (
                                <button
                                    onClick={() => handleEditCar()}
                                    className="cursor-pointer bg-green-400 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">
                                    Done
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="cursor-pointer bg-blue-400 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleCancelCar()}
                                className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal xác nhận xóa */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowModal(false);
                    }}>
                    <div className="bg-white text-black/80 rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            Confirm Delete
                        </h3>
                        <p>
                            Are you sure you want to delete car:{" "}
                            <strong>{carToDelete?.name}</strong>?
                        </p>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                                No
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
