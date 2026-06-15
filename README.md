# Cụm công nghiệp Trung Lương 2 - Static Website

Trang web tĩnh giới thiệu **Cụm công nghiệp Trung Lương 2** — chủ đầu tư Công ty Cổ phần Alpha Corp, tỉnh Ninh Bình.

## Công nghệ

- HTML5
- Tailwind CSS (CDN)
- CSS tùy chỉnh
- JavaScript (vanilla)

## Cấu trúc

```
├── index.html      # Trang chính
├── css/
│   └── styles.css  # Styles bổ sung
├── js/
│   └── main.js     # Tương tác (menu, tabs, counter, form...)
└── README.md
```

## Chạy local

Mở trực tiếp file `index.html` trong trình duyệt, hoặc dùng live server:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Truy cập: http://localhost:8080

## Sections

1. Hero — Giới thiệu dự án
2. Thống kê — 50 ha, 632 tỷ VNĐ, 50 năm hoạt động
3. Tổng quan — Giới thiệu & Chủ đầu tư Alpha Corp (tabs)
4. Ngành nghề — Cơ khí, Dệt may, Logistics
5. Hạ tầng — Giao thông, kỹ thuật, cảnh quan
6. Vị trí — Xã Bình An, Ninh Bình & kết nối giao thông
7. Lợi ích đầu tư
8. Gallery — Không gian công nghiệp
9. Đối tượng đầu tư — Nhật Bản, Đài Loan, Hàn Quốc, Việt Nam
10. Đăng ký tư vấn — Form liên hệ
11. Footer
