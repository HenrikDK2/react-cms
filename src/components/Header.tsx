import { FC } from "react";

const isAdminPage = window.location.pathname === "/admin";

export const Header: FC = () => (
  <header className="py-4 shadow-md">
    <div className="max-w-[1200px] mx-auto flex items-center">
      <h1 className="font-bold text-2xl">React CMS</h1>
      <a
        className="ml-auto block max-w-max font-bold text-white bg-[#d21b1b] rounded-md py-2 px-4"
        href={isAdminPage ? "/" : "/admin"}
      >
        {isAdminPage ? "Go to homepage" : "Go to admin page"}
      </a>
    </div>
  </header>
);
