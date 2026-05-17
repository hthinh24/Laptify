# 💻 Laptify - Modern E-Commerce Platform for Laptops

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Spring Boot](https://img.shields.io/badge/SpringBoot-4.x-success)
![MariaDB](https://img.shields.io/badge/MariaDB-Supported-blue)

Laptify là một hệ thống thương mại điện tử chuyên biệt cho mặt hàng Laptop. Dự án tập trung vào việc tối ưu hóa
trải nghiệm tìm kiếm, quản lý giỏ hàng linh hoạt và cung cấp các tính năng quản trị mạnh mẽ cho việc quản lý sản phẩm
và đơn hàng.

---

## 👥 Nhóm phát triển (Members)

* **[23733531 - Dương Hưng Thịnh]** - *Fullstack Developer*
* **[23704871 - Nguyễn Văn Anh Đức]** - *Fullstack Developer*
* **[23709671 - Phan Văn Quân]** - *Frontend Developer*

---

## ✨ Tính năng nổi bật (Key Features)

### 🛒 Dành cho Khách hàng (Customer End)

* **Xác thực & Bảo mật (Authentication):** Đăng nhập/Đăng ký an toàn phân quyền người dùng (Role-based Access Control).
* **Tìm kiếm & Lọc nâng cao (Advanced Search):** Khám phá laptop theo danh mục, khoảng giá, và hãng sản xuất kết hợp
  phân trang (Pagination).
* **Gợi ý sản phẩm (Recommendations):** Hiển thị "Sản phẩm liên quan" và "Dành cho bạn" dựa trên thuật toán
  gom nhóm Category
* **Danh mục yêu thích:** Lưu trữ các sản phẩm yêu thích.

### ⚙️ Dành cho Quản trị viên (Admin End)

* **Quản lý vòng đời đơn hàng (Order Lifecycle):** Kiểm soát và cập nhật trạng thái đơn hàng (Chờ xác nhận -> Đang
  giao -> Hoàn thành/Đã hủy).
* **Kiểm soát Tồn kho (Inventory Management):** Quản lý trạng thái In-stock/Out-of-stock, chống bán lố sản phẩm.
* **Quản lý Sản phẩm & Phân loại:** Thêm, sửa, xóa thông tin Sku, giá cả, và cấu hình laptop.
* **Lưu trữ Đa phương tiện (Media Management):** Tích hợp Cloudinary API để upload, tối ưu hóa kích thước và quản lý ảnh
  sản phẩm tập trung.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

**Frontend:**

* **Framework:** React.js
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Data Visualization:** Recharts
* **HTTP Client:** Axios

**Backend:**

* **Framework:** Java Spring Boot 4
* **Security:** Spring Security with JWT
* **ORM:** Spring Data JPA / Hibernate
* **Database:** MariaDB
* **API Documentation** Swagger UI
* **Media Storage:** Cloudinary Cloud

---

## 🚀 Hướng dẫn cài đặt (Getting Started)

### Yêu cầu hệ thống (Prerequisites)

* ReactJS (19+)
* Java JDK 21
* MariaDB

### Thiết lập Backend

1. Clone dự án về máy.
2. Mở thư mục backend, copy file `example.env` thành `.env`.
    ```bash
    cp example.env .env
    ```
3. Cấu hình thông tin kết nối MariaDB, API Keys của Cloudinary và secret key cho JWT trong file `.env`.
4. Run:

- Frontend:
    ```bash
    npm install
    npm start
    ```

- Backend:
    ```bash
    ./mvnw spring-boot:run
    ```

## Tài liệu API (API Documentation)
Sau khi chạy backend, truy cập Swagger UI tại [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) để khám phá các endpoint.

## Bản quyền (License)

Dự án này được phân phối dưới giấy phép MIT License. Xem
file [LICENSE](https://github.com/hthinh24/Laptify/blob/main/LICENSE) để biết thêm chi tiết.