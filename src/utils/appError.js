class appError extends Error {
  constructor() {
    super();
  }
  create(message, statusCode, stack) {
    this.message = message;
    this.statusCode = statusCode;
    return this;
  }
}
export const createError = (message, statusCode) => {
  return new appError().create(message, statusCode);
};
export default appError;
