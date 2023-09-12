/* "use client";

import { ReactNode, createContext, useState } from "react";

 interface ContextProps {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} 
interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({});

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);

  const signUp = async(name,email,password)=>{
    const res = await 

    console.log(res)
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
 */
