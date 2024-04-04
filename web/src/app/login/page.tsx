import {cn} from "@/lib/utils";
import {LoginButton} from "@/components/auth/login-button";
import {Button} from "@radix-ui/themes";

export default function Login() {
  return (
      <main className="flex min-h-screen h-full flex-col items-center justify-center">
          <div className="space-y-6 text-center">
              <h1 className="text-6xl font-semibold text-white drop-shadow-md">
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
  )
}