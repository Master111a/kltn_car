import { useEffect, useRef, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
export default function AdminReport() {
    const nameRef = useRef(null);

    const [users, setUsers] = useState([
        { id: 1, name: "Nguyễn Văn A", avatar: "", email: "a@example.com" },
        { id: 2, name: "Trần Thị B", avatar: "", email: "b@example.com" },
        { id: 3, name: "Lê Văn C", avatar: "", email: "c@example.com" },
        { id: 4, name: "Lê Văn C", avatar: "", email: "c@example.com" },
        { id: 5, name: "Lê Văn C", avatar: "", email: "c@example.com" },
        { id: 6, name: "Lê Văn C", avatar: "", email: "c@example.com" },
        { id: 7, name: "Lê Văn C", avatar: "", email: "c@example.com" },
        { id: 8, name: "Lê Văn C", avatar: "", email: "c@example.com" },
        { id: 9, name: "Lê Văn C", avatar: "", email: "c@example.com" },
    ]);
    // State để lưu thông tin tài khoản được chọn
    const [selectedUser, setSelectedUser] = useState(null);
    // State để điều khiển modal xác nhận xóa
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // State để lưu tài khoản cần xóa
    const [userToDelete, setUserToDelete] = useState(null);
    useEffect(() => {
        if (isEdit && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isEdit]);
    useEffect(() => {
        if (selectedUser) return;
        setIsEdit(false);
    }, [selectedUser]);
    // Xử lý khi chọn một tài khoản để xem thông tin
    const handleEditUser = () => {
        setSelectedUser(null);
    };
    const handleCancelUser = () => {
        setSelectedUser(null);
    };
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    // Xử lý khi nhấn nút xóa
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    // Xác nhận xóa tài khoản
    const confirmDelete = () => {
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setShowModal(false);
        setUserToDelete(null);
        setSelectedUser(null); // Reset thông tin tài khoản được chọn
    };

    // Hủy xóa
    const cancelDelete = () => {
        setShowModal(false);
        setUserToDelete(null);
    };
    return (
        <div className="h-full p-6 relative bg-red-50">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Manage Report
            </h1>
            <Link
                to={"add-report"}
                className="flex items-center justify-center px-2 py-1 absolute top-4 left-4 font-medium bg-blue-400 gap-2 rounded-md cursor-pointer hover:bg-blue-500">
                <span>Add Report</span>
                <FaPlus />
            </Link>
            {/* Danh sách tài khoản */}
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-black">
                    List Report
                </h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-blue-500">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Avatar</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user?.id} className="border-b text-black">
                                <td className="px-4 py-2 text-center">
                                    {user?.id}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {user?.name}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <img
                                        src={user.avatar || ""}
                                        alt="avatar"
                                        className="w-16 h-16 rounded-full overflow-hidden m-auto"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {user?.email}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleSelectUser(user)}
                                        className="cursor-pointer text-blue-500 bg-white px-3 py-1 rounded mr-2 hover:text-blue-700">
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user)}
                                        className="cursor-pointer text-red-500 bg-white px-3 py-1 rounded hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalPages={8} />
            </div>

            {/* Hiển thị thông tin tài khoản được chọn */}
            {selectedUser && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="max-w-4xl w-4/5 mx-auto bg-white text-black/80 shadow-md rounded-lg p-6">
                        <h2 className="text-xl text-center font-semibold mb-4">
                            Account information
                        </h2>
                        <div className="flex flex-col items-start justify-start gap-4">
                            {isEdit ? (
                                <>
                                    <p>
                                        <strong>ID:</strong> {selectedUser?.id}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <div className="grow">
                                            <strong>Name:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={selectedUser?.name}
                                                ref={nameRef}
                                                onChange={(e) =>
                                                    setSelectedUser((pre) => ({
                                                        ...pre,
                                                        name: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>

                                        <p className="grow">
                                            <strong>Email:</strong>{" "}
                                            {selectedUser?.email}
                                        </p>
                                    </div>
                                    <p>
                                        <strong>Avatar:</strong>{" "}
                                        <img
                                            src={selectedUser.avatar || ""}
                                            alt="avatar"
                                            className="w-16 h-16 rounded-full overflow-hidden"
                                        />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>ID:</strong> {selectedUser?.id}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <p className="grow">
                                            <strong>Name:</strong>{" "}
                                            {selectedUser?.name}
                                        </p>

                                        <p className="grow">
                                            <strong>Email:</strong>{" "}
                                            {selectedUser?.email}
                                        </p>
                                    </div>
                                    <p>
                                        <strong>Avatar:</strong>{" "}
                                        <img
                                            src={selectedUser.avatar || ""}
                                            alt="avatar"
                                            className="w-16 h-16 rounded-full overflow-hidden"
                                        />
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="mt-4 flex items-center justify-end w-full">
                            {isEdit ? (
                                <button
                                    onClick={() => handleEditUser()}
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
                                onClick={() => handleCancelUser()}
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
                            Confirm delete
                        </h3>
                        <p>
                            Are you sure you want to delete account:{" "}
                            <strong>{userToDelete?.email}</strong> ?
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
