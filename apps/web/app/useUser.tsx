// app/providers.tsx
'use client';

import axios from 'axios';
import { useState , useEffect } from 'react';

type UserData =  {
  name: string;
  id: string;
  googleId: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}


export function useUser() {
  const [user , setUser] = useState<UserData>();

  useEffect(() => {
    async function getUser() {
       const res = await axios.get('/api/user')
      //  console.log(res);
      setUser(res.data)
    }
    getUser()
  },[])

  return user
}