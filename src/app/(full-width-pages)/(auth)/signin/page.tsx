import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDP Dashboard Sign In",
  description: "This is the signin page for CDP Dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
