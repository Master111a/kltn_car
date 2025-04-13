// src/AdminReport.jsx
import { useEffect, useRef, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function AdminReport() {
    const titleRef = useRef(null);
    const [reports, setReports] = useState([
        {
            id: 1,
            title: "Issue with Order #123",
            content: "Customer reported a delay in delivery.",
            date: "2025-04-10",
            status: "Open",
        },
        {
            id: 2,
            title: "Product Quality Concern",
            content: "The car glass was scratched upon delivery.",
            date: "2025-04-11",
            status: "Resolved",
        },
        {
            id: 3,
            title: "Payment Error",
            content: "Customer was charged twice for the same order.",
            date: "2025-04-12",
            status: "Open",
        },
    ]);
    // State để lưu thông tin báo cáo được chọn
    const [selectedReport, setSelectedReport] = useState(null);
    // State để điều khiển modal xác nhận xóa
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // State để lưu báo cáo cần xóa
    const [reportToDelete, setReportToDelete] = useState(null);

    useEffect(() => {
        if (isEdit && titleRef.current) {
            titleRef.current.focus();
        }
    }, [isEdit]);

    useEffect(() => {
        if (!selectedReport) setIsEdit(false);
    }, [selectedReport]);

    // Xử lý khi chọn một báo cáo để xem thông tin
    const handleSelectReport = (report) => {
        setSelectedReport(report);
    };

    // Xử lý khi nhấn nút xóa
    const handleDeleteClick = (report) => {
        setReportToDelete(report);
        setShowModal(true);
    };

    // Xác nhận xóa báo cáo
    const confirmDelete = () => {
        setReports(
            reports?.filter((report) => report.id !== reportToDelete.id)
        );
        setShowModal(false);
        setReportToDelete(null);
        setSelectedReport(null);
    };

    // Hủy xóa
    const cancelDelete = () => {
        setShowModal(false);
        setReportToDelete(null);
    };

    // Xử lý chỉnh sửa báo cáo
    const handleEditReport = () => {
        setReports(
            reports?.map((report) =>
                report.id === selectedReport.id ? selectedReport : report
            )
        );
        setSelectedReport(null);
    };

    const handleCancelReport = () => {
        setSelectedReport(null);
    };

    return (
        <div className="h-full p-6 relative bg-green-50">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Manage Reports
            </h1>
            <Link
                to={"add-report"}
                className="flex items-center justify-center px-2 py-1 absolute top-4 left-4 font-medium bg-blue-400 gap-2 rounded-md cursor-pointer hover:bg-blue-500">
                <span>Add Report</span>
                <FaPlus />
            </Link>

            {/* Danh sách báo cáo */}
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-black">
                    List Reports
                </h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports?.map((report) => (
                            <tr
                                key={report?.id}
                                className="border-b text-black">
                                <td className="px-4 py-2 text-center">
                                    {report?.id}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {report?.title}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {report?.date}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {report?.status}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() =>
                                            handleSelectReport(report)
                                        }
                                        className="cursor-pointer text-blue-500 bg-white px-3 py-1 rounded mr-2 hover:text-blue-700">
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(report)
                                        }
                                        className="cursor-pointer text-red-500 bg-white px-3 py-1 rounded hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalPages={Math.ceil(reports?.length / 3)} />
            </div>

            {/* Hiển thị thông tin báo cáo được chọn */}
            {selectedReport && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="max-w-4xl w-4/5 mx-auto bg-white text-black/80 shadow-md rounded-lg p-6">
                        <h2 className="text-xl text-center font-semibold mb-4">
                            Report Details
                        </h2>
                        <div className="flex flex-col items-start justify-start gap-4">
                            {isEdit ? (
                                <>
                                    <p>
                                        <strong>ID:</strong>{" "}
                                        {selectedReport?.id}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <div className="grow">
                                            <strong>Title:</strong>{" "}
                                            <input
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={selectedReport?.title}
                                                ref={titleRef}
                                                onChange={(e) =>
                                                    setSelectedReport(
                                                        (prev) => ({
                                                            ...prev,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grow">
                                            <strong>Status:</strong>{" "}
                                            <select
                                                className="focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                                value={selectedReport?.status}
                                                onChange={(e) =>
                                                    setSelectedReport(
                                                        (prev) => ({
                                                            ...prev,
                                                            status: e.target
                                                                .value,
                                                        })
                                                    )
                                                }>
                                                <option value="Open">
                                                    Open
                                                </option>
                                                <option value="Resolved">
                                                    Resolved
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <strong>Content:</strong>{" "}
                                        <textarea
                                            className="w-full focus:outline-none focus:border-2 focus:border-gray-400 rounded-md px-1"
                                            value={selectedReport?.content}
                                            onChange={(e) =>
                                                setSelectedReport((prev) => ({
                                                    ...prev,
                                                    content: e.target.value,
                                                }))
                                            }
                                            rows="4"
                                        />
                                    </div>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {selectedReport?.date}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>ID:</strong>{" "}
                                        {selectedReport?.id}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-4 h-10">
                                        <p className="grow">
                                            <strong>Title:</strong>{" "}
                                            {selectedReport?.title}
                                        </p>
                                        <p className="grow">
                                            <strong>Status:</strong>{" "}
                                            {selectedReport?.status}
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <strong>Content:</strong>{" "}
                                        <p>{selectedReport?.content}</p>
                                    </div>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {selectedReport?.date}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="mt-4 flex items-center justify-end w-full">
                            {isEdit ? (
                                <button
                                    onClick={() => handleEditReport()}
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
                                onClick={() => handleCancelReport()}
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
                            Are you sure you want to delete report:{" "}
                            <strong>{reportToDelete?.title}</strong>?
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
