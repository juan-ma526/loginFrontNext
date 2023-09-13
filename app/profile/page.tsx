"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../auth-Provider";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, errors } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      return router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div>
      {user ? (
        <div>
          <span>{user.id}</span>
          <span>{user.email}</span>
          <span>{user.name}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
