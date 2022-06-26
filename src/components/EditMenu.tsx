import { KeyboardEvent, FC } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IoClose, IoList } from "react-icons/io5";
import { EditLink } from "./Link";
import { EditHeading } from "./Heading";
import { Content } from "../types/content";
import { closeMenu } from "../redux/slices/menuSlice";
import { EditProductList } from "./ProductList";
import { BiLink, BiHeading } from "react-icons/bi";
import {
  addContent,
  defaultHeading,
  defaultLink,
  defaultProductList,
} from "../redux/slices/contentSlice";

interface IRenderProps {
  currentType: Content["type"];
}

const RenderEditableContent: FC<IRenderProps> = ({ currentType }) => {
  switch (currentType) {
    case "link":
      return <EditLink />;
    case "heading":
      return <EditHeading />;
    case "productList":
      return <EditProductList />;
  }
};

export const EditMenu: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.content.data);
  const { editContentIndex, isOpen } = useAppSelector((state) => state.menu);
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") dispatch(closeMenu());
  };

  return (
    <>
      <aside
        onKeyDown={handleKeyDown}
        className={`fixed right-0 top-0 z-10 w-80 h-[100%] transition-all duration-700 bg-white shadow-lg ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0"
        }`}
      >
        <button
          onClick={() => dispatch(closeMenu())}
          className="ml-auto block transition-colors hover:text-red-500"
        >
          <IoClose size={40} />
        </button>
        {typeof editContentIndex === "number" && (
          <form className="px-4 pt-2" onSubmit={(e) => e.preventDefault()}>
            <RenderEditableContent currentType={data[editContentIndex].type} />
          </form>
        )}
      </aside>
      <aside className="fixed h-12 w-64 bottom-0 left-1/2 z-10 bg-white -translate-x-1/2 shadow-md border-2 border-[#e5e7eb] flex justify-around">
        <button>
          <BiLink onClick={() => dispatch(addContent(defaultLink))} size={40} />
        </button>
        <button>
          <BiHeading
            onClick={() => dispatch(addContent(defaultHeading))}
            size={40}
          />
        </button>
        <button>
          <IoList
            onClick={() => dispatch(addContent(defaultProductList))}
            size={40}
          />
        </button>
      </aside>
    </>
  );
};
