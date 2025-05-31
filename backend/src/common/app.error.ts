import { HttpStatus } from "./http.status";

export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

