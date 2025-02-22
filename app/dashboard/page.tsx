/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react'
import { useSelector } from 'react-redux'


export default function Dashboard() {
 
  const currentUser = useSelector(
    (state: any) => state.user && state.user.user.currentUser
  );


  return (
    <div>

        <h1>this is my dashboard</h1>
        <h1>{currentUser?.user?.name}</h1>
    </div>
  )
}
