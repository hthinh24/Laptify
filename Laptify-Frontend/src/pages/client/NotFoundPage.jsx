import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full">
      {/* 1. Breadcrumb Navigation */}
      <nav className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <ol className="flex items-center gap-2 text-sm font-poppins">
            <li>
              <Link
                to="/"
                className="text-foreground transition-colors hover:font-medium"
              >
                Trang chủ
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="text-muted-foreground">404 Not Found</li>
          </ol>
        </div>
      </nav>

      {/* 2. 404 Content: */}
      <div className="flex flex-col items-center justify-center bg-background px-4 py-[140px]">
        <div className="text-center">
          {/* 2.1 Tiêu đề 404 Not Found: Font Inter, Size 110, Medium */}
          <h1 className="mb-6 font-inter text-[110px] font-medium leading-[115px] tracking-[3%] text-black">
            404 Not Found
          </h1>

          {/* 2.2 Dòng thông tin: Font Poppins, Size 16, Regular */}
          <p className="mb-10 font-poppins text-[16px] font-normal leading-[24px] tracking-[0%] text-black">
            Không tìm thấy trang bạn yêu cầu. Bạn có thể quay trở về trang chủ
            để tiếp tục.
          </p>

          {/* 2.3 Nút quay về trang chủ: Màu DB4444 */}
          <Link
            to="/"
            className="inline-block rounded-sm bg-[#DB4444] px-12 py-4 font-poppins font-medium text-white transition-all hover:bg-[#bd3a3a] hover:shadow-lg"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
