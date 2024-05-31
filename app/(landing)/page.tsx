import { Button } from "@/components/ui/button";
import Link from "next/link" 

const Landing = () => {
    return (
      <div>
        Landing Page (Unprotected)
        <div>
          <Link href="/sign-in">
            <Button className="w-full">Login</Button>
          </Link>

          <Link href="/sign-up">
            <Button className="w-full">Register</Button>
          </Link>
        </div>
      </div>
    );
}

export default Landing;