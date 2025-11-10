export const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user info" });
      }

      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied: Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
