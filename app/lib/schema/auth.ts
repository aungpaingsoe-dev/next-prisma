import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is invalid",
    })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is requried" }),
    email: z
      .string()
      .email({
        message: "Email is invalid",
      })
      .min(1, { message: "Email is required" }),
    password: z.string().min(3, { message: "Password is minimun 2 character" }),
    passwordConfirm: z
      .string()
      .min(1, { message: "Password confirm is required" }),
  })
  .refine((args) => args.password === args.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
