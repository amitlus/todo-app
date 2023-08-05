import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface NavItemProps {
  text: string;
  href: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ text, href, isActive }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleSignIn = () => {
    signIn("github", {
      callbackUrl: "/",
    });
  };

  const handleClick = () => {
    if (href === "/api/auth/signout") {
      handleSignOut();
    } else if (href === "/api/auth/signin") {
      handleSignIn();
    } else {
      router.push(href);
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div
        className={`text-white ${isActive ? "font-bold" : "hover:underline"}`}
      >
        {text}{" "}
      </div>
    </div>
  );
};

export default NavItem;
