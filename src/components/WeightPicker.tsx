import { FC } from "react";
import { AiOutlineBold } from "react-icons/ai";
import { BiFont } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { updateContentWithNewProps } from "../utils";
import { HeadingContent } from "./Heading";
import { LinkContent } from "./Link";

interface IWeightPickerProps {
  content: HeadingContent | LinkContent;
}

export const WeightPicker: FC<IWeightPickerProps> = ({ content }) => {
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  return (
    <div>
      <label htmlFor="weight">Weight</label>
      <div className="flex gap-2 mt-2" id="weight">
        <button
          onClick={() => {
            dispatch(
              updateContentWithNewProps(
                content,
                { weight: "normal" },
                editContentIndex
              )
            );
          }}
          className={`flex justify-center items-center transition-all w-8 h-8 rounded-full hover:shadow-lg border-slate-100  ${
            content.props.weight === "normal" && "border-2 shadow-lg"
          }`}
        >
          <BiFont size={20} />
        </button>
        <button
          onClick={() => {
            dispatch(
              updateContentWithNewProps(
                content,
                { weight: "bold" },
                editContentIndex
              )
            );
          }}
          className={`flex justify-center items-center transition-all w-8 h-8 rounded-full hover:shadow-lg border-slate-100  ${
            content.props.weight === "bold" && "border-2 shadow-lg"
          }`}
        >
          <AiOutlineBold size={20} />
        </button>
      </div>
    </div>
  );
};
