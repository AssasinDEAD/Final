const jwt = require("jsonwebtoken");

module.exports = (requiredRoles = null) => {
  return (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      console.error("Нет токена");
      return res.status(403).json({ message: "Нет доступа" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRoles) {
        const allowed = Array.isArray(requiredRoles)
          ? requiredRoles.includes(decoded.role)
          : decoded.role === requiredRoles;

        if (!allowed) {
          console.error("Нет достаточных прав", decoded.role, requiredRoles);
          return res.status(403).json({ message: "Доступ запрещен" });
        }
      }

      next();
    } catch (error) {
      console.error("Ошибка при верификации токена:", error.message);
      return res.status(401).json({ message: "Токен недействителен или истёк" });
    }
  };
};
