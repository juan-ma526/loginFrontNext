"use client";

import { NextResponse } from "next/server";
import { ReactNode, createContext, useState } from "react";

interface ContextProps {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  signUp: (name: string, email: string, password: string) => any;
  isAuthenticated: boolean;
  errors: string[] | null;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as ContextProps);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const data = await response.json();
      if (data.error) {
        setErrors(data.error);
      }
      if (data.id) {
        setUser(data);
        setIsAuthenticated(true);
        setErrors(null);
      }

      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
}
