import { KeyboardEvent, FC, useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IoClose, IoList, IoLogoMarkdown } from "react-icons/io5";
import { EditLink } from "../content/Link";
import { EditHeading } from "../content/Heading";
import { Content } from "../../types";
import { closeMenu } from "../../redux/slices/adminSlice";
import { EditCardList } from "../content/CardList";
import { BiLink, BiHeading } from "react-icons/bi";
import { defaultHeading, defaultLink, defaultCardList, defaultMarkdown } from "../../data/default";
import { EditMarkdown } from "../content/Markdown";
import { addContent } from "../../redux/slices/contentSlice";
interface IRenderProps {
  currentType: Content["type"];
}

const RenderEditableContent: FC<IRenderProps> = ({ currentType }) => {
  switch (currentType) {
    case "link":
      return <EditLink />;
    case "heading":
      return <EditHeading />;
    case "cardList":
      return <EditCardList />;
    case "markdown":
      return <EditMarkdown />;
    default:
      return null;
  }
};

export const EditMenu: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.content.data);
  const { editContentIndex, isOpen } = useAppSelector((state) => state.admin);
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") dispatch(closeMenu());
  };

  // Resizing
  const menuRef = useRef<HTMLElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  useEffect(() => {
    if ((menuRef.current, resizeRef.current)) {
      const menu = menuRef.current;
      const resize = resizeRef.current;
      let x: number;

      const mouseMoveHandler = (e: MouseEvent) => {
        if (x && menu) {
          const dx = Math.abs(x - e.clientX);
          const width = menu.clientWidth;
          let newWidth = x > e.clientX ? width + dx : width - dx;
          x = e.clientX;
          menu.style.width = newWidth + "px";
        }
      };

      const mouseUpHandler = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        setIsResizing(false);
      };

      const mouseDownHandler = (e: MouseEvent) => {
        x = e.clientX;
        setIsResizing(true);
        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseup", mouseUpHandler);
      };

      resize.addEventListener("mousedown", mouseDownHandler);
      return () => resize.removeEventListener("mousedown", mouseDownHandler);
    }
  }, [menuRef, resizeRef]);

  return (
    <>
      <aside
        ref={menuRef}
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
        className={`fixed overflow-visible overflow-y-scroll pb-4 right-0 top-0 z-10 w-80 h-[100%] max-w-full min-w-[320px] bg-white shadow-lg  ${
          !isResizing && "transition-all duration-700"
        } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0"}`}
      >
        <div
          ref={resizeRef}
          className={`absolute h-full -left-6 top-0 z-40 cursor-ew-resize ${isResizing ? "w-full" : "w-8"}`}
        />
        <button
          tabIndex={isOpen ? 0 : -1}
          onClick={() => dispatch(closeMenu())}
          className="ml-auto block transition-colors hover:text-red-500"
        >
          <IoClose aria-label="Close edit menu" size={40} />
        </button>
        {typeof editContentIndex === "number" && (
          <form className="px-4 pt-2" onSubmit={(e) => e.preventDefault()}>
            <RenderEditableContent currentType={data[editContentIndex].type} />
          </form>
        )}
      </aside>
      <aside className="fixed h-12 w-64 bottom-0 left-1/2 z-10 bg-white -translate-x-1/2 shadow-md border-2 border-[#e5e7eb] flex justify-around">
        <button>
          <BiLink aria-label="Add link" onClick={() => dispatch(addContent(defaultLink))} size={40} />
        </button>
        <button>
          <BiHeading aria-label="Add heading" onClick={() => dispatch(addContent(defaultHeading))} size={40} />
        </button>
        <button>
          <IoList aria-label="Add card list" onClick={() => dispatch(addContent(defaultCardList))} size={40} />
        </button>
        <button>
          <IoLogoMarkdown aria-label="Add markdown" onClick={() => dispatch(addContent(defaultMarkdown))} size={40} />
        </button>
      </aside>
    </>
  );
};
