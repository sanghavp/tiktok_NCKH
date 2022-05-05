# Hướng dẫn sử dụng và chi tiết API

## Tải về và chạy chương trình
### Tải về
- Truy cập vào đường dẫn: https://github.com/sanghavp/tiktok_NCKH để xem folder này.
- Mở terminal trên VS code đến thư mục muốn lưu trữu code và thực hiện lệnh: "
> git clone https://github.com/sanghavp/tiktok_NCKH.git
- Công việc lúc này là chỉ cần đợi sao chép code về máy (Yêu cầu mạng)
- Sau khi tải xong thì thực hiện chạy chương trình tại terminal bằng cú pháp: 
> npm install
Tải toàn bộ thư viện của dự án.
> node app.js 
Nếu bạn có cài sẵn nodemon trong máy thì nên chạy 
> nodemon app.js
Để lắng nghe sự thay đổi và tự động chạy lại khi lưu file.

 - Sau này thư mục sẽ vẫn được viết thêm nên khi có thay đổi bạn chỉ cần vào terminal thực hiện lệnh **git pull** là đã có thể tải thêm những phần thay đổi trong code mà không cần tải lại toàn bộ gây tốn dung lượng và khó kiểm soát.

### Chạy chương trình
- Khi chạy thì hệ thống sẽ tự động vào web để lấy dữ liệu. Mặc định khi up lên thì mình thực hiện crawl số ít dữ liệu để tránh mất thời gian. Nếu bạn muốn lấy nhiều dữ liệu hơn thì có thể thay đổi giá trị biến MAX_SCROLL trong file crawler.js trong thư mục *CrawlData (./CrawlData/crawler.js)*.

## API 
### Api video
- Post video: 
   + API URI: *http://localhost:2022/video*
   + APi sử dụng phương thức post để thực hiện đẩy toàn bộ dữ liệu vừa crawl được lên db.
### Api user
- Create user
   + API URI: *http://localhost:2022/user*,
   + API này sử dụng phương thức post để đăng kí người dùng hệ thống.
   + Một số lưu ý: 
      * Các trường trong code phải đúng theo các trường được quy định ở file users.js trong thư mục Models. (name, nickName, * phoneNumber, email, bidthOfDate, password, gender, Phần isAdmin mặc định là false nên không cần nhập)
      * Trường name là giá trị duy nhất nên không được phép có 2 name giống nhau trong database, name không được ít hơn 6 kí tự và dài hơn 30 kí tự
      * PhoneNuber và email phải là thông tin thật ( số điện thoại có thể bỏ trống)
      * password không được ít hơn 8 kí tự
      * Đọc kĩ ràng buộc trong file users.js trong thư mục Models
- get All Users
   + API URI: *http://localhost:2022/user* 
   + sử dụng phương thức get để xem danh sách người dùng trên hệ thống
   + chỉ admin mới có thể xem
- Get an user
   + API URI: *http://localhost:2022/user* 
   + sử dụng phương thức get
   + Chỉ admin hoặc chính người dùng đó mới xem được chính mình
   + Id của người dùng được lưu trên params
- Login
   + API URI: *http://localhost:2022/user/login*
   + Sử dụng phương thức post để đăng nhập và hệ thống
   + Đăng nhập bằng email và mật khẩu
   + Sau khi đăng nhập server sẽ tự động renderr ra một đoạn mã json chứa id người dùng và trường isAdmin (để kiểm tra xem có phải là admin hay không) lên header với trường là Authorization và một đoạn mã json để refresh token lên cookie với trường tên là refreshToken.
- delete User 
   + API URI: *http://localhost:2022/user*
   + sử dụng phương thức delete
   + Chỉ admin hoặc chính người dùng đó mới xóa được chính mình
   + Id của người dùng được lưu trên params

- Update User
   + API URI: *http://localhost:2022/user/:id*
   + Cập nhật thông tin user bằng phương thức put
   + Id của người dùng được lưu trên params
   + Chỉ admin hoặc chính người dùng đó mới cập nhật được thông tin của chính mình
- Refresh token
   + API URI: *http://localhost:2022/user/refresh/:id*
   + Refresh lại mã json khi hết hạn (sau 1 ngày)