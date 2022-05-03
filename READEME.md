### Hướng dẫn sử dụng và chi tiết API

## Tải về và chạy chương trình
# Tải về
- Truy cập vào đường dẫn: https://github.com/sanghavp/tiktok_NCKH để xem folder này.
- Mở terminal trên VS code đến thư mục muốn lưu trữu code và thực hiện lệnh: "git clone https://github.com/sanghavp/tiktok_NCKH.git"
- Công việc lúc này là chỉ cần đợi sao chép code về máy (Yêu cầu mạng)
- Sau khi tải xong thì thực hiện chạy chương trình tại terminal bằng cú pháp: 
   + "npm install" để tải toàn bộ thư viện của dự án.
   + "node app.js". Nếu bạn có cài sẵn nodemon trong máy thì nên chạy "nodemon app.js" để lắng nghe sự thay đổi và tự động chạy lại khi lưu file.
# Chạy chương trình
- Khi chạy thì hệ thống sẽ tự động vào web để lấy dữ liệu. Mặc định khi up lên thì mình thực hiện crawl số ít dữ liệu để tránh mất thời gian. Nếu bạn muốn lấy nhiều dữ liệu hơn thì có thể thay đổi giá trị biến MAX_SCROLL trong file crawler.js trong thư mục CrawlData (./CrawlData/crawler.js).

## API 
# Api video
- Post video: 
   + API URI: http://localhost:2022/video
   + APi sử dụng phương thức post để thực hiện đẩy toàn bộ dữ liệu vừa crawl được lên db.
# Api user
- Create user
   + API URI: http://localhost:2022/user,
   + API này sử dụng phương thức post để đăng kí người dùng hệ thống.
   + Một số lưu ý: 
      * Các trường trong code phải đúng theo các trường được quy định ở file users.js trong thư mục Models. (name, nickName, * phoneNumber, email, bidthOfDate, password, gender, Phần isAdmin mặc định là false nên không cần nhập)
      * Trường name là giá trị duy nhất nên không được phép có 2 name giống nhau trong database, name không được ít hơn 6 kí tự và dài hơn 30 kí tự
      * PhoneNuber và email phải là thông tin thật ( số điện thoại có thể bỏ trống)
      * password không được ít hơn 8 kí tự
      * Đọc kĩ ràng buộc trong file users.js trong thư mục Models

