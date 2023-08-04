import Link from "next/link";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  //Todo: Add a CSS for active nav items.
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();

  const MENU_LIST_ACTIVE = [
    { text: "Todos", href: "/todos" },
    { text: "Profile", href: "/profile" },
    { text: "Logout", href: "/api/auth/signout" },
  ];

  const MENU_LIST_INACTIVE = [{ text: "Sign in", href: "/api/auth/signin" }];

  const navOptions = session ? MENU_LIST_ACTIVE : MENU_LIST_INACTIVE;

  return (
    <header>
      <nav className="nav">
        {/* Logo/Title */}
        <Link href="/">Todo-App</Link>
        {/* Menu List */}
        <div className="nav__menu-list">
          {navOptions.map((menu) => (
            <div key={menu.text}>
              <NavItem text={menu.text} href={menu.href} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
