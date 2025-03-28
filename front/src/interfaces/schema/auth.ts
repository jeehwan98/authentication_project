import { z } from "zod";

{/* write logic for auth schemas */ }

// export const LoginSchema = z.object({
//   email: z.string(),
//   password: z
//     .string()
//     .min(8, { message: "Be at least 8 characters long" })
//     .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
//     .regex(/[0-9]/, { message: "Contain at least one number." })
//     .regex(/[^a-zA-Z0-9]/, {
//       message: "Contain at least one special character.",
//     })
//     .trim(),
// });