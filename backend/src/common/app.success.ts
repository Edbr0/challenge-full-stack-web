export class ApiResponse<T = any> {
  constructor(
    public readonly message: string,
    public readonly data?: T,
    public readonly statusCode: number = 200
  ) {}

  toJSON() {
    return {
      status: 'success',
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}