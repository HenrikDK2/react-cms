import { CSSProperties, FC } from "react";
import { AiOutlineAlignRight, AiOutlineAlignCenter, AiOutlineAlignLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateContentWithNewProps } from "../../utils";
import { HeadingContent } from "../content/Heading";
import { LinkContent } from "../content/Link";

interface IAlignPickerProps {
  content: HeadingContent | LinkContent;
}

export const AlignPicker: FC<IAlignPickerProps> = ({ content }) => {
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const handleClick = (align: CSSProperties["textAlign"]) => {
    dispatch(updateContentWithNewProps(content, { align }, editContentIndex));
  };

  return (
    <div>
      <label htmlFor="align">Alignment</label>

      <div className="flex gap-2 mt-2" id="align">
        <button
          onClick={() => handleClick("left")}
          className={`flex justify-center items-center transition-all w-8 h-8 rounded-full hover:shadow-lg border-slate-100  ${
            content.props.align === "left" && "border-2 shadow-lg"
          }`}
        >
          <AiOutlineAlignLeft aria-label="Left alignment" size={20} />
        </button>
        <button
          onClick={() => handleClick("center")}
          className={`flex justify-center items-center transition-all w-8 h-8 rounded-full hover:shadow-lg border-slate-100  ${
            content.props.align === "center" && "border-2 shadow-lg"
          }`}
        >
          <AiOutlineAlignCenter aria-label="Center alignment" size={20} />
        </button>{" "}
        <button
          onClick={() => handleClick("right")}
          className={`flex justify-center items-center transition-all w-8 h-8 rounded-full hover:shadow-lg border-slate-100  ${
            content.props.align === "right" && "border-2 shadow-lg"
          }`}
        >
          <AiOutlineAlignRight aria-label="Right alignment" size={20} />
        </button>
      </div>
    </div>
  );
};
