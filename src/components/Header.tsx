import { FC } from "react";
import { closeMenu, disableAdminMode, enableAdminMode } from "../redux/slices/adminSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const Header: FC = () => {
  const adminMode = useAppSelector((state) => state.admin.adminMode);
  const dispatch = useAppDispatch();

  return (
    <header className="py-4 shadow-md">
      <div className="max-w-[1224px] mx-auto flex items-center px-6">
        <h1 className="font-bold text-2xl">React CMS</h1>
        <button
          onClick={() => {
            if (adminMode) {
              dispatch(closeMenu());
              dispatch(disableAdminMode());
            } else {
              dispatch(enableAdminMode());
            }
          }}
          className="ml-auto block max-w-max font-bold text-white bg-[#d21b1b] rounded-md py-2 px-4"
        >
          {adminMode ? "Disable admin mode" : "Enable admin mode"}
        </button>
      </div>
    </header>
  );
};
