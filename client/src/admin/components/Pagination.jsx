import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Pagination({ totalPages = 5 }) {
    // Sử dụng useSearchParams để lấy và cập nhật query params
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy giá trị page hiện tại từ URL, mặc định là 1 nếu không có
    const currentPage = parseInt(searchParams.get("page")) || 1;

    // Xử lý khi nhấn nút Previous
    const handlePrevious = () => {
        if (currentPage > 1) {
            setSearchParams({ page: currentPage - 1 });
        }
    };

    // Xử lý khi nhấn nút Next
    const handleNext = () => {
        if (currentPage < totalPages) {
            setSearchParams({ page: currentPage + 1 });
        }
    };

    // Xử lý khi nhấn vào số trang
    const handlePageClick = (page) => {
        setSearchParams({ page });
    };

    // Tạo danh sách các số trang
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center w-full">
            <nav className="flex w-full items-center justify-center !mr-0 h-10 text-black">
                <ul className="flex items-center self-stretch !gap-2">
                    {/* Nút Previous */}
                    <li>
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className={`bg-gray-400 px-2 py-1 rounded-md text-white  hover:bg-white hover:text-gray-700 font-semibold min-w-[80px] flex items-center border border-gray-400 justify-center hover:!no-underline ${
                                currentPage === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}>
                            Previous
                        </button>
                    </li>

                    {/* Danh sách số trang */}
                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => handlePageClick(page)}
                                className={`px-2 py-1 !text-black !no-underline flex items-center border rounded-md cursor-pointer ${
                                    currentPage === page
                                        ? "bg-blue-400 border-blue-400 font-semibold !text-white"
                                        : "border-gray-400"
                                }`}>
                                {page}
                            </button>
                        </li>
                    ))}

                    {/* Nút Next */}
                    <li>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`bg-gray-400 px-2 py-1 rounded-md text-white  hover:bg-white hover:text-gray-700 font-semibold min-w-[80px] flex items-center border border-gray-400 justify-center hover:!no-underline ${
                                currentPage === totalPages
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
