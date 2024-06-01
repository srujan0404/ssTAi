import { Button } from "@/components/ui/button";
import Link from "next/link" 

const Landing = () => {
    return (
      <div>
        Landing Page (Unprotected)
        <div className="flex flex-row">
          <Link href="/sign-in">
            <Button className="w-56 rounded-lg ml-5">Login</Button>
          </Link>

          <Link href="/sign-up">
            <Button className="w-56 rounded-lg ml-3">Register</Button>
          </Link>
        </div>
      </div>
    );
} 

export default Landing;