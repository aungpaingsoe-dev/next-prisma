"use server";
import { SignInSchema, SignUpSchema } from "@/app/lib/schema/auth";
import prisma from "@/prisma/client";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error, success } = await SignInSchema.safeParseAsync({
    email,
    password,
  });

  if (!success) {
    return { success, error: "Unauthorized", details: error?.issues };
  }

  try {
    const result = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!email) {
      return { success: false, error: "Unauthorized" };
    }

    if(result?.password !== data.password){
      return { success: false, error: "Unauthorized" }
    }

    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const { data, error, success } = await SignUpSchema.safeParseAsync({
    name,
    email,
    password,
    passwordConfirm,
  });

  if (!success) {
    return { success, error: "Unauthorized", details: error?.issues };
  }

  try {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
