'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, googleProvider } from '@/utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '@/utils/AuthContext';
import { useRouter } from 'next/navigation';
import instance from '@/utils/axios';

export default function Home() {
  const { islogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      }
      try {
        const response = await instance.post('/api/user', userData);
        console.log("FULL RESPONSE:", response.data);
        console.log("USER OBJECT:", response.data.user);
        setUserInfo(response.data.user);
        setLogin(true);

        localStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.user)
        );
        localStorage.setItem('isLogin', 'true');

      } catch (err) {
        console.log(err);
      }
      // setUserInfo(userData);
      if (userInfo.role === "admin") {
        router.push("/AdminPage");
      } else {
        router.push("/Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen backdrop-blur-md bg-white/30">
        <div className="bg-black p-8 rounded-xl shadow-lg text-center text-white cursor-pointer">
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <div className='bg-white text-black w-60 mt-4 rounded-2xl h-8 text-center cursor-pointer' onClick={handleLogin}>
            <GoogleIcon sx={{ color: 'red' }} /> Sign In With Google
          </div>
        </div>
      </div>
    </>
  );
}