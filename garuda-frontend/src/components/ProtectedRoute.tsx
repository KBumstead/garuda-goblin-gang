import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole: string | null;
  children: React.ReactNode;
}

const ProtectedRoute = ({
  isAuthenticated,
  allowedRoles = [],
  userRole = "",
  children,
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // NOTE: If you see a TS error here, ensure your tsconfig.json has "lib": ["es2016", "dom"] or later for Array.prototype.includes support.
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole ?? "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
