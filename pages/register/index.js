import RegisterForm from "@/components/RegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const Register = () => {
    // Router
    const router = useRouter();

    // Check Session
    const { data: session } = useSession()

    if(session) router.push("dashboard");

    return (
        <RegisterForm />
    );
}
 
export default Register;