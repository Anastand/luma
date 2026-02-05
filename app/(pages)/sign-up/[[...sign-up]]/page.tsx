import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/onboarding"
        redirectUrl="/onboarding"
      />
    </div>
  );
}
