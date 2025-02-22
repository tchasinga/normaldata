/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signInStart, signInSuccess, signInFailure } from "@/redux/user/userSlice";
import toast from "react-hot-toast";

// Define the Redux state shape
interface RootState {
  user: {
    user: {
      loading: boolean;
    };
  };
}

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loading = useSelector((state: RootState) => state.user?.user?.loading);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signInStart());

    try {
      const res = await fetch(`/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure("Sign in failed"));
        toast.error(data.message || "Invalid credentials");
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("Sign in successful!");
      router.push("/dashboard");
    } catch (error) {
      dispatch(signInFailure("An error occurred during sign in"));
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-start">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-primary text-white py-2 rounded-md" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-4 font-light text-xs">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="hover:text-green-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}
