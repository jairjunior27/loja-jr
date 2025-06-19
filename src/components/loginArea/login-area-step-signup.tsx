"use client";

import { useToken } from "@/store/auth";
import { useState } from "react";
import { z } from "zod";
import { CustonInput } from "../layout/custon-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import { User } from "@/generated/prisma";

const schema = z
  .object({
    name: z.string().min(2, "Campo obrigatorio"),
    email: z.string().email("E-mail invalido"),
    password: z.string().min(2, "Campo Obrigatorio"),
    confirmePassword: z.string().min(2, "Campo Obrigatorio"),
  })
  .refine((data: any) => data.password === data.confirmePassword, {
    message: "Senhas não batem",
    path: ["confirmePassword"],
  });

type props = {
  email: string;
};

type SignupResponse = {
  user: User;
  token: string;
  error: string;
};

export const LoginAreaSignup = ({ email }: props) => {
  const auth = useToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");
  const [confirmePasswordField, setConfirmePasswordField] = useState("");

  const handleButton = async () => {
    setErrors(null);
    const validData = schema.safeParse({
      name: nameField,
      email: emailField,
      password: passwordField,
      confirmePassword: confirmePasswordField,
    });

    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);
      const signupReq = await api.post<SignupResponse>("/auth/signup", {
        name: validData.data.name,
        email: validData.data.email,
        password: validData.data.password,
      });
        setLoading(false)
      if (!signupReq.data.token) {
        alert(signupReq.data.error);
      } else {
        auth.setToken(signupReq.data.token);
        auth.setOpen(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <p className="mb-2">Digite seu Nome:</p>
        <CustonInput
          name="name"
          errors={errors}
          disabled={loading}
          type="string"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
        />
      </div>
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
        />
      </div>
      <div className="">
        <p className="mb-2">Confirme seu Password:</p>
        <CustonInput
          name="password"
          errors={errors}
          disabled={loading}
          type="password"
          value={confirmePasswordField}
          onChange={(e) => setConfirmePasswordField(e.target.value)}
        />
      </div>

      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
