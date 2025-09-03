# Atomic Design Structure - Lab3

## Tổng quan
Lab3 đã được tổ chức lại theo chuẩn **Atomic Design Pattern** để tạo ra một cấu trúc component có thể mở rộng và dễ bảo trì.

## Cấu trúc thư mục (Đã chuẩn hóa)

```
lab3/src/components/
├── atoms/
│   ├── Button/index.jsx
│   ├── Card/index.jsx
│   └── index.js
├── molecules/
│   ├── TaskCard/index.jsx
│   ├── ProgressCard/index.jsx
│   └── index.js
├── organisms/
│   ├── GroupTaskCard/index.jsx
│   ├── Header/
│   │   ├── index.jsx
│   │   └── Header.css
│   ├── Sidebar/
│   │   ├── index.jsx
│   │   └── Sidebar.css
│   ├── CalendarSection/
│   │   ├── index.jsx
│   │   └── CalendarSection.css
│   └── index.js
├── templates/
│   └── MainContent/
│       ├── index.jsx
│       └── MainContent.css
└── pages/
    └── Dashboard/
        ├── index.jsx
        └── Dashboard.css
```

## Phân loại Components (Đã sửa đổi)

### 🔹 Atoms (Nguyên tử)

Đây là các khối xây dựng cơ bản nhất. Chúng đóng gói các component từ thư viện UI (ví dụ: Material-UI) để tạo ra một API nhất quán và kiểm soát style tập trung.

-   **Button**: Bọc `MuiButton` để cung cấp style mặc định.
-   **Card**: Bọc `MuiCard` để cung cấp style thẻ mặc định.

### 🔸 Molecules (Phân tử)

Là sự kết hợp của các atoms, tạo thành các đơn vị giao diện có chức năng cụ thể.

-   **TaskCard**: Hiển thị thông tin của một công việc. (Sử dụng `Card` atom).
-   **ProgressCard**: Hiển thị tiến độ chung. (Sử dụng `Card` atom).

### 🔶 Organisms (Sinh vật)

Các phần giao diện lớn và phức tạp, thường bao gồm nhiều molecules và/hoặc atoms.

-   **GroupTaskCard**: Hiển thị thông tin một nhóm công việc.
-   **Header**: Thanh điều hướng đầu trang.
-   **Sidebar**: Thanh điều hướng bên cạnh.
-   **CalendarSection**: Khu vực hiển thị lịch.

### 🔷 Templates & Pages

-   **Templates (`MainContent`)**: Xác định bố cục chính của trang.
-   **Pages (`Dashboard`)**: Trang hoàn chỉnh mà người dùng nhìn thấy.

## Cách sử dụng

Việc import giờ đây trở nên nhất quán hơn nhờ cấu trúc thư mục và các file `index.js` (barrel files).

```jsx
// Import một atom
import { Button } from './components/atoms';

// Import một molecule
import { TaskCard } from './components/molecules';

// Import một organism
import { Header } from './components/organisms';

// Import một trang
import { Dashboard } from './components/pages';
```

## Lợi ích của cấu trúc mới

1.  **Tuân thủ chặt chẽ Atomic Design**: Phân loại component chính xác hơn.
2.  **Giảm sự phụ thuộc**: Các component cấp cao (molecules, organisms) không còn phụ thuộc trực tiếp vào thư viện UI bên ngoài, mà phụ thuộc vào các `atoms` của dự án.
3.  **Dễ dàng thay đổi & bảo trì**: Nếu cần thay đổi thư viện UI hoặc cập nhật style toàn cục, bạn chỉ cần sửa ở lớp `atoms`.
4.  **Tính nhất quán cao**: Đảm bảo tất cả các button, card,... trong ứng dụng đều có giao diện và hành vi nhất quán.

## Quy tắc phát triển

1. **Atoms** không được phụ thuộc vào atoms khác
2. **Molecules** có thể sử dụng atoms
3. **Organisms** có thể sử dụng atoms và molecules
4. **Templates** định nghĩa layout, sử dụng organisms
5. **Pages** là instances cụ thể của templates

## Chạy ứng dụng
```bash
cd lab3
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3001
