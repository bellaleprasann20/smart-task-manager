// Wraps async route handlers so errors are passed to errorMiddleware
// instead of needing try/catch in every controller function.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;