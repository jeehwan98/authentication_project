import * as React from "react"

import { cn } from "@/lib/utils"
import { FormInputProps, PasswordInputProps } from "@/interfaces/inputs"
import { Eye, EyeOff, Lock } from "lucide-react"
import { capitalizeFirstLetter } from "@/lib/constants"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

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

export function PasswordInput({
  name,
  placeholder,
  toggleVisibility,
  isVisible,
  error
}: PasswordInputProps) {
  return (
    <div className="">
      <label className="pl-1 font-medium">{capitalizeFirstLetter(placeholder)}</label>
      <div className="relative mt-1">
        <Input
          type={isVisible ? "text" : "password"}
          name={name}
          placeholder="••••••••"
          className="pl-10 pr-4 py-3 w-full mb-2 h-10"
          required
        />
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
        >
          {isVisible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-3 ml-1">{error}</p>}
    </div>
  )
}

export { Input }
