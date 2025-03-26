import { Input } from "@/components/ui/input";
import { capitalizeFirstLetter } from "@/constants";
import { FormInputProps } from "@/interfaces/inputs";
import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
}

export function FormInput({
  name,
  placeholder,
  error,
  icon: Icon
}: FormInputProps) {
  return (
    <div className="mb-5">
      <label className="pl-1 font-medium">{capitalizeFirstLetter(name)}</label>
      <div className="relative mt-1">
        <Input
          type={name}
          name={name}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 w-full mb-2 h-10"
          required
        />
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-3 ml-1">{error}</p>}
    </div>
  )
}

export default function InputField({
  type,
  name,
  placeholder,
}: InputFieldProps) {
  return (
    <input
      className="w-full px-2 py-2 border rounded focus:outline-none text-base"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}