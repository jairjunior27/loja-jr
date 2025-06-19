import { useState } from "react";
import { CustonInput } from "../layout/custon-input";
import { Button } from "../ui/button";
import z from "zod";
import { api } from "@/lib/axios";

const schema = z.object({
  email: z.string().email("E-mail invalido"),
});
type prop = {
  onValidate: (hasEmail: boolean, email: string) => void;
};

type valideEmailResponse = {
  exists: boolean;
};

export const LoginAreaStepEmail = ({ onValidate }: prop) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);
  const [emailField, setEmailField] = useState("");

  const handleButton = async () => {
    setErrors(null);

    const validData = schema.safeParse({
      email: emailField,
    });

    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);
      const emailReq = await api.post<valideEmailResponse>(
        "/auth/validate_email",
        {
          email: validData.data.email,
        }
      );
      setLoading(false);
      onValidate(emailReq.data.exists ? true : false, validData.data.email);
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
      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
