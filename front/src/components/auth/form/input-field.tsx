import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange
}: InputFieldProps) {
  return (
    <input
      className="w-full px-2 py-2 border rounded focus:outline-none text-base"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}