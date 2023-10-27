import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Home() {
  // Router
  const router = useRouter();

  // Check Session
  const { data: session } = useSession()

  if(session) router.push("dashboard");

  return (
    <main>
      <LoginForm />
    </main>
  )
}
