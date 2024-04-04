import { Button } from "@radix-ui/themes";
import { Poppins } from "next/font/google";
import {cn} from "@/lib/utils";
import {LoginButton} from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className,
        )}>
          🔐 Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication service
        </p>
        <div>
          <LoginButton  asChild>
            <Button variant="solid" highContrast>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
