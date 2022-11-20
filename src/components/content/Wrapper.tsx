import { DragEvent, FC } from "react";
import { deleteContent, swapContent, updateDragItem } from "../../redux/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { closeMenu, openMenu, setEditContentIndex } from "../../redux/slices/adminSlice";

interface IContainerProps {
  index: number;
  children: any;
}

export const ContentWrapper: FC<IContainerProps> = ({ index, children }) => {
  const { dragItem, data } = useAppSelector((state) => state.content);
  const { adminMode, editContentIndex } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  if (adminMode) {
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
      e.currentTarget.classList.add("opacity-50", "border-red-500");
      dispatch(updateDragItem(index));
    };

    const handleDragEnd = () => {
      dispatch(swapContent([dragItem, index]));
      dispatch(setEditContentIndex(dragItem));
    };

    return (
      <div
        draggable="true"
        onDragEnter={handleDragEnter}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.currentTarget.classList.remove("opacity-50", "border-red-500")}
        onDragExit={(e) => e.currentTarget.classList.remove("opacity-50", "border-red-500")}
        onDrop={(e) => e.currentTarget.classList.remove("opacity-50", "border-red-500")}
        className="relative border-dashed border-2 py-10 border-indigo-500 flex justify-center items-center mb-4 hover:cursor-move"
      >
        {/* Open edit menu */}

        <button
          onClick={() => {
            dispatch(openMenu());
            dispatch(setEditContentIndex(index));
          }}
          className="absolute right-2 top-2 cursor-pointer"
        >
          <FaRegEdit aria-label="Open edit menu" className="text-xl" />
        </button>

        {/* Delete content */}

        <button
          onClick={() => {
            dispatch(closeMenu());
            dispatch(setEditContentIndex(null));
            dispatch(deleteContent(index));
          }}
          className="absolute right-8 top-2 cursor-pointer  "
        >
          <AiOutlineDelete aria-label="Delete content" className="text-xl" />
        </button>

        {/* Move content up */}

        <button
          onClick={() => {
            if (index > 0) {
              const newIndex = index - 1;
              dispatch(swapContent([index, newIndex]));

              if (editContentIndex === index) {
                dispatch(setEditContentIndex(newIndex));
              } else {
                dispatch(closeMenu());
              }
            }
          }}
          className={`absolute left-2 top-2 cursor-pointer ${index === 0 && "opacity-20 pointer-events-none"}`}
        >
          <AiOutlineUp aria-label="Move content up" className="text-xl" />
        </button>

        {/* Move content down */}

        <button
          onClick={() => {
            if (index !== data.length - 1) {
              const newIndex = index + 1;
              dispatch(swapContent([index, newIndex]));

              if (editContentIndex === index) {
                dispatch(setEditContentIndex(newIndex));
              } else {
                dispatch(closeMenu());
              }
            }
          }}
          className={`absolute left-8 top-2 cursor-pointer ${
            index === data.length - 1 && "opacity-20 pointer-events-none"
          }`}
        >
          <AiOutlineDown aria-label="Move content down" className={"text-xl"} />
        </button>

        <div className="w-[100%] select-none pointer-events-none">{children}</div>
      </div>
    );
  }

  return children;
};
