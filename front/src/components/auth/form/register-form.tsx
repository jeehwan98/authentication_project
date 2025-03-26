"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "./input-field";
import { RegisterDetails } from "@/interfaces";
import { registerAPI } from "@/app/api/auth";



export default function RegisterForm() {
  const [RegisterDetails, setRegisterDetails] = useState<RegisterDetails>({ email: "", password: "", name: "", provider: "" });
  const [registerLoading, setregisterLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setregisterLoading(false);
    try {
      const response = await registerAPI({
        email: RegisterDetails.email,
        password: RegisterDetails.password,
        name: RegisterDetails.name,
        provider: "email"
      });

      if (response?.error) {
        setRegisterError(response.error);
      } else {
        console.log("register successful:", response);
        router.push("/login");
      }
    } catch (error) {
      setregisterLoading(false);
      console.error("error occurred while logging in: ", error);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          placeholder="John Doe"
          value={RegisterDetails.name}
          onChange={(e) => setRegisterDetails({ ...RegisterDetails, name: e.target.value })}
        />
        <InputField
          type="text"
          name="email"
          placeholder="example@email.com"
          value={RegisterDetails.email}
          onChange={(e) => setRegisterDetails({ ...RegisterDetails, email: e.target.value })}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={RegisterDetails.password}
          onChange={(e) => setRegisterDetails({ ...RegisterDetails, password: e.target.value })}
        />
        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
        <Button
          type="submit"
          disabled={registerLoading}
          className="w-full"
        >
          {registerLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  )
}