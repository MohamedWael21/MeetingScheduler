"use client";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 shadow-sm">
      <div>
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="logo"
          className="w-[150px] md:w-[200px]"
        />
      </div>
      <ul className="hidden text-lg font-medium md:flex gap-14">
        <li className="transition-all duration-300 cursor-pointer hover:text-primary">
          Product
        </li>
        <li className="transition-all duration-300 cursor-pointer hover:text-primary">
          Pricing
        </li>
        <li className="transition-all duration-300 cursor-pointer hover:text-primary">
          Contact us
        </li>
        <li className="transition-all duration-300 cursor-pointer hover:text-primary">
          About us
        </li>
      </ul>
      <div>
        <LoginLink>
          <Button variant="ghost">login</Button>
        </LoginLink>
        <RegisterLink>
          <Button>Get Started</Button>
        </RegisterLink>
      </div>
    </div>
  );
};
export default Header;
