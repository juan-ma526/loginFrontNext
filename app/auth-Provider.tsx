"use client";

import { NextResponse } from "next/server";
import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ContextProps {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  signUp: (name: string, email: string, password: string) => any;
  signIn: (email: string, password: string) => any;
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
  const [errors, setErrors] = useState<string[] | null>(null);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        credentials: "include",
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

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
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
    } catch (error: any) {
      setErrors(["Contraseña o email incorrectos"]);
    }
  };
  // Aqui este useeffect es para ver si existe un token en la cookie, si es asi, lo manda al back para q de estar viende se cargue el usuario sin necesidad de loguear de nuevo
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const response = await fetch(
            "http://localhost:4000/api/auth/verify",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (!data) setIsAuthenticated(false);

          setIsAuthenticated(true);
          setUser(data);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, user, isAuthenticated, errors, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
