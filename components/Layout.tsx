import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import AuthProvider from "@/context/AuthProvider";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </>
  );
};
export default Layout;
