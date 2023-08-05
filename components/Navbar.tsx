import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavItem from "./NavItem";

const Navbar = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session } = useSession();

  const MENU_LIST_ACTIVE = [
    { text: "Todos", href: "/todos" },
    { text: "Logout", href: "/api/auth/signout" },
  ];

  const MENU_LIST_INACTIVE = [{ text: "Sign in", href: "/api/auth/signin" }];

  const navOptions = session ? MENU_LIST_ACTIVE : MENU_LIST_INACTIVE;

  return (
    <header>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        {/* Logo/Title */}
        <Link href="/" className="text-2xl font-bold">
          Todo-App
        </Link>
        {/* Menu List */}
        <div className="flex space-x-4">
          {navOptions.map((menu) => (
            <NavItem
              key={menu.text}
              text={menu.text}
              href={menu.href}
              isActive={isActive(menu.href)}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
