import React from "react";
import { EditMenu } from "./components/edit/Menu";
import { useAppSelector } from "./redux/store";
import { Header } from "./components/Header";
import { ComponentRenderer } from "./components/ContentRenderer";

interface AppProps {
  children?: React.ReactNode;
}

export const App: React.FC<AppProps> = () => {
  const adminMode = useAppSelector((state) => state.admin.adminMode);

  return (
    <>
      <Header />
      <main className="max-w-[1224px] m-auto pt-4 px-6 mb-16">
        <ComponentRenderer />
        {adminMode && <EditMenu />}
      </main>
    </>
  );
};
