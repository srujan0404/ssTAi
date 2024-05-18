import { Button } from "@/components/ui/button";
import Link from "next/link" 

const Landing = () => {
    return (
      <div>
        Landing Page (Unprotected)
        <div>
          <Link href="/sign-in">
            <Button className="bg-black w-1">Login</Button>
          </Link>

          <Link href="/sign-up">
            <Button className="h-1">Register</Button>
          </Link>
        </div>
      </div>
    );
}

export default Landing;