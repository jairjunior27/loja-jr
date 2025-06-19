"use client";

import { useToken } from "@/store/auth";
import { useState } from "react";
import { z } from "zod";
import { CustonInput } from "../layout/custon-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import { User } from "@/generated/prisma";

const schema = z.object({
  email: z.string().email("E-mail invalido"),
  password: z.string().min(2, "Campo Obrigatorio"),
});

type props = {
  email: string;
};

type SignupResponse = {
  user: User;
  token: string;
  error: string;
};

export const LoginAreaSignin = ({ email }: props) => {
  const auth = useToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);
  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");

  const handleButton = async () => {
    setErrors(null);
    const validData = schema.safeParse({
      email: emailField,
      password: passwordField,
    });

    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);
      const signinReq = await api.post<SignupResponse>("/auth/signin", {
        email: validData.data.email,
        password: validData.data.password,
      });
      setLoading(false);
      if (!signinReq.data.token) {
        alert(signinReq.data.error);
      } else {
        auth.setToken(signinReq.data.token);
        auth.setOpen(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <p className="mb-2">Digite seu E-mail:</p>
        <CustonInput
          name="email"
          errors={errors}
          disabled={loading}
          type="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>
      <div className="">
        <p className="mb-2">Digite seu Password:</p>
        <CustonInput
          name="password"
          errors={errors}
          disabled={loading}
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          autoFocus
        />
      </div>

      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
