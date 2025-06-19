"use client";

import { useToken } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { LoginAreaStepEmail } from "./login-area-step-email";
import { LoginAreaSignup } from "./login-area-step-signup";
import { getCookie } from "cookies-next/client";
import { LoginAreaSignin } from "./login-area-step-signin";

type Steeps = "Email" | "Signup" | "Signin";

export const LoginAreaDialog = () => {
  const auth = useToken();
  const [step, setStep] = useState<Steeps>("Email");
  const [emailField,setEmailField] = useState("")


  useEffect(() => {
    const token = getCookie("token")
    if(token) auth.setToken(token)
  },[])

  const handleValidate = (hasEmail: boolean, email: string) =>{
    setEmailField(email)
   if(hasEmail){
    setStep("Signin")
   }else{
    setStep("Signup")
   }
  }
  return (
    <Dialog open={auth.open} onOpenChange={(open) => auth.setOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step !== "Email" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep("Email")}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            {step === "Email" && "Login / Cadastro"}
            {step === "Signin" && "Login"}
            {step === "Signup" && "Cadastro"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {step === "Email" && <LoginAreaStepEmail onValidate={handleValidate} />}
          {step === "Signup" && <LoginAreaSignup email={emailField}/>}
          {step === "Signin" && <LoginAreaSignin email={emailField}/>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
