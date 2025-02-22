/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const currentUser = useSelector((state: any) => state.user && state.user.user.currentUser);
    const router = useRouter();
  
    useEffect(() => {
      if (!currentUser?.user) {
        router.push("/signin");
      }
    }, [currentUser, router]);

  return (
    <div>
        <h1>This is my dashboard</h1>
        <h1>{currentUser?.user.name}</h1>
    </div>
  )
}