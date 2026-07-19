// Split out from authMiddleware for clarity — must run AFTER protect,
// since it relies on req.user being set.
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};