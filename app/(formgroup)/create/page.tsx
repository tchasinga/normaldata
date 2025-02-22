/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSelector } from 'react-redux';

export default function Createdata() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentUser = useSelector((state: any) => state.user && state.user.user.currentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/creating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          content: formData.content,
          description: formData.description,
          authorId: currentUser.id || currentUser.user.id || currentUser.user.currentUser.id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message || "Submission failed.");
      }

      toast.success('Post created successfully!')
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-start">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
        <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <Input type="text" name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
        <Input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <button type="submit" className="bg-primary text-white py-2 rounded-md" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}