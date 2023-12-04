import { SignInButton, useUser, UserButton, SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";

const SignUpPage = () => {
  const router = useRouter();

  const handleSignUpSuccess = async () => {
    await router.push("/sell-an-item");
  };

  return (
    <SignUp onSuccess={handleSignUpSuccess}>
      <SignInButton>Sign in</SignInButton>
    </SignUp>
  );
};

export default SignUpPage;
