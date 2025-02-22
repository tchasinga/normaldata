"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInStart, signInSuccess, signInFailure } from "@/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define the shape of the state for the selector
interface RootState {
  user: {
    user: {
      loading: boolean;
    };
  };
}

export default function Signin() {
  interface FormData {
    email?: string;
    password?: string;
  }

  const [formData, setFormData] = useState<FormData>({});
  const { loading } = useSelector((state: RootState) => state.user && state.user.user);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Sign in started");
      dispatch(signInStart());

      const res = await fetch(`/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Sign in failed", data);
        toast.error("Sign in failed");
        dispatch(signInFailure("Sign in failed"));
        setShowError(true);
        return;
      }

      console.log("Sign in successful", data);
      dispatch(signInSuccess(data));
      toast.success("Sign in successful");
      router.push("/dashboard");
      setShowSuccess(true);
      setShowError(false);
    } catch (error) {
      console.error("An error occurred during sign in", error);
      setShowError(true);
      dispatch(signInFailure("An error occurred during sign in"));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-start">Sign in</h1>
      <form className="flex flex-col gap-4 w-72" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email || ""}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password || ""}
        />
        <button className="bg-primary text-white py-2 rounded-md" type="submit">
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      {showError && <p className="mt-4 font-light text-xs text-red-500">Sign in failed. Please try again.</p>}
      {showSuccess && <p className="mt-4 font-light text-xs text-green-500">Sign in successful!</p>}
      <p className="mt-4 font-light text-xs">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="hover:text-green-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}