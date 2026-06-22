import z from "zod";

export const profileUpdateSchema = z.object({
  full_name: z.string().min(3, "Username must be 3 or more characters").max(50, "Username is too long"),
  email: z.email("Please enter a valid email").trim().lowercase(),
  phone: z.string("Enter a valid phone number").min(10, "Invalid phone number").max(15, "Invalid phone number"),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
