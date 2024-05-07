import { UserButton } from "@clerk/nextjs";

const Landing = () => {
  return (
    <div>
      <p>Dashboad Page (Protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Landing;
