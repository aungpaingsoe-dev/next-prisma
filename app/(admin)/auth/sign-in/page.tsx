"use client";

import { signIn } from "@/app/actions/admin/auth";
import { Response } from "@/types";
import { Button, Input } from "antd";
import { Checkbox } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function signInPage() {
  const router = useRouter();
  const [data, setData] = useState<Response | null>(null);

  const onChange = (event: any) => {
    console.log(event.target.checked);
  };

  const handleSubmit = async (formData: FormData) => {
    const data = await signIn(formData);
    setData(data);
    if (data.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className=" flex h-screen ">
      <div className=" basis-1/2 bg-blue-500 "></div>
      <div className=" basis-1/2 ">
        <div className=" flex h-screen items-center align-middle">
          <form
            action={handleSubmit}
            className=" w-3/4 mx-auto flex flex-col gap-4 "
          >
            <div className=" text-3xl ">Sign In</div>
            <div className=" flex flex-col gap-2 ">
              <label htmlFor="email">Email</label>
              <Input
                placeholder="Enter your email"
                id="email"
                name="email"
                size="middle"
              />
            </div>
            <div className=" flex flex-col gap-1 ">
              <label htmlFor="password">Password</label>
              <Input.Password
                placeholder="Enter your password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <Checkbox onChange={(event) => onChange(event)}>
                Remember me
              </Checkbox>
            </div>
            <div className=" flex align-middle justify-between ">
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
              <Button type="link">Forgot password?</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
