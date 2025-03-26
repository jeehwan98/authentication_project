"use client"

import { useState } from "react"

export default function ReactHooksPage() {
  const [count, setCount] = useState<number>(0);

  return (
    <span>
      <div>{count}</div>
      <button
        onClick={() => setCount(count + 1)}
        className="px-2 py-1 bg-black text-white"
      >
        Add
      </button>
      <button
        onClick={() => setCount(count - 1)}
        className="px-2 py-1 bg-black text-white"
      >
        Subtract
      </button>
    </span>
  )
}