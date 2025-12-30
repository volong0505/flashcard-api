export class BaseResponse<T> {
  status: 'success' | 'failed' | 'warning';   
  message: string;  // Thông báo cho người dùng hoặc log
  data?: T;         // Dữ liệu trả về (có thể rỗng)
  timestamp: string;

  constructor(status: 'success' | 'failed' | 'warning', message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}