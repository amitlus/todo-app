import Link from "next/link";

interface NavItemProps {
  text: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, href }) => {
  return (
    <Link href={href} passHref>
      {text}
    </Link>
  );
};

export default NavItem;
