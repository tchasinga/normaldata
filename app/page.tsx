/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard/page";
import Signin from "./(formgroup)/signin/page";

interface RootState {
  user: {
    user: {
      currentUser: any;
    };
  };
}

export default function Home() {
  const currentUser = useSelector((state: RootState) => state.user.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser?.user) {
      router.push("/signin");
    }
  }, [currentUser, router]);

  return (
    <div className="max-w-screen-xl mx-auto px-5">
        {
          currentUser ? <Dashboard /> : <Signin />
        }
    </div>
  );
}