import { DragEvent, FC } from "react";
import {
  deleteContent,
  swapContent,
  updateDragItem,
} from "../redux/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { openMenu, setEditContentIndex } from "../redux/slices/adminSlice";

interface IContainerProps {
  index: number;
  children: any;
}

export const EditWrapper: FC<IContainerProps> = ({ index, children }) => {
  const { dragItem } = useAppSelector((state) => state.content);
  const adminMode = useAppSelector((state) => state.admin.adminMode);
  const dispatch = useAppDispatch();

  if (adminMode) {
    const handleDragStart = () => {
      dispatch(updateDragItem(index));
    };

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
      e.currentTarget.classList.add("opacity-50");

      if (typeof dragItem === "number") {
        dispatch(updateDragItem(index));
      }
    };

    const handleDragEnd = () => {
      if (typeof dragItem === "number") {
        dispatch(swapContent([dragItem, index]));
        dispatch(setEditContentIndex(dragItem));
      }
    };

    return (
      <div
        draggable="true"
        onDragEnter={handleDragEnter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onDragExit={(e) => e.currentTarget.classList.remove("opacity-50")}
        onDrop={(e) => e.currentTarget.classList.remove("opacity-50")}
        className="relative border-dashed border-2 py-2 border-indigo-500 flex justify-center items-center mb-4 hover:cursor-move"
      >
        <button
          onClick={() => {
            dispatch(openMenu());
            dispatch(setEditContentIndex(index));
          }}
          className="absolute right-0 top-0 cursor-pointer"
        >
          <FaRegEdit aria-label="Open edit menu" className="text-xl" />
        </button>
        <button
          onClick={() => {
            dispatch(deleteContent(index));
          }}
          className="absolute right-6 top-0 cursor-pointer"
        >
          <AiOutlineDelete aria-label="Delete content" className="text-xl" />
        </button>
        <div className="w-[100%] select-none pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return children;
};
