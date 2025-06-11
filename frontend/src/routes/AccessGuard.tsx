import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

type AccessStatus = "loading" | "granted" | "unauthenticated" | "forbidden";

type Props = {
  roles?: string[];
};

const AccessGuard = ({ roles }: Props) => {
  const { user, role, isLoading } = useAuth();
  const [access, setAccess] = useState<AccessStatus>("loading");

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      setAccess("unauthenticated");
      return;
    }

    if (roles && !roles.includes(role || "")) {
      setAccess("forbidden");
      toast.error("У вас нет доступа!");
      return;
    }

    setAccess("granted");
  }, [user, role, roles, isLoading]);

  if (isLoading || access === "loading") return null;
  if (access === "unauthenticated") return <Navigate to="/login" />;
  if (access === "forbidden") return <Navigate to="/" />;

  return <Outlet />;
};

export default React.memo(AccessGuard);
