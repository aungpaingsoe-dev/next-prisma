"use client";

import { signUp } from "@/app/actions/admin/auth";
import { Button, Input } from "antd";
import { Checkbox } from "antd";
import { useState } from "react";
import { Response } from "@/types";
import { useRouter } from "next/navigation";

export default function signUpPage() {
  const [data, setData] = useState<Response | null>(null);
  const router = useRouter();

  const onChange = (event: any) => {
    console.log(event.target.checked);
  };

  const handleSubmit = async (formData: FormData) => {
    const data = await signUp(formData);
    setData(data);
    if (data.success) {
      router.push("/auth/sign-in");
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
            <div className=" text-3xl ">Sign Up</div>
            <div className=" flex flex-col gap-2 ">
              <label htmlFor="name">Name</label>
              <Input
                placeholder="Enter your name"
                id="name"
                name="name"
                size="middle"
              />
              {data?.details &&
                data.details
                  ?.filter((detial) => {
                    return detial.path.includes("name");
                  })
                  .map((item) => (
                    <div className=" text-red-500 text-sm " key={item.code}>
                      {item.message}
                    </div>
                  ))}
            </div>
            <div className=" flex flex-col gap-2 ">
              <label htmlFor="email">Email</label>
              <Input
                placeholder="Enter your email"
                id="email"
                name="email"
                size="middle"
              />
              {data?.details &&
                data.details
                  ?.filter((detial) => {
                    return detial.path.includes("email");
                  })
                  .map((item) => (
                    <div className=" text-red-500 text-sm " key={item.code}>
                      {item.message}
                    </div>
                  ))}
            </div>
            <div className=" flex flex-col gap-1 ">
              <label htmlFor="password">Password</label>
              <Input.Password
                placeholder="Enter your password"
                name="password"
                id="password"
              />
              {data?.details &&
                data.details
                  ?.filter((detial) => {
                    return detial.path.includes("password");
                  })
                  .map((item) => (
                    <div className=" text-red-500 text-sm " key={item.code}>
                      {item.message}
                    </div>
                  ))}
            </div>
            <div className=" flex flex-col gap-1 ">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <Input.Password
                placeholder="Enter your confirm password"
                name="passwordConfirm"
                id="passwordConfirm"
              />
              {data?.details &&
                data.details
                  ?.filter((detial) => {
                    return detial.path.includes("passwordConfirm");
                  })
                  .map((item) => (
                    <div className=" text-red-500 text-sm " key={item.code}>
                      {item.message}
                    </div>
                  ))}
            </div>
            <div>
              <Checkbox onChange={(event) => onChange(event)}>
                Remember me
              </Checkbox>
            </div>
            <div className=" flex align-middle justify-end ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
