import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getContent, updateContentWithNewProps } from "../utils";
import { ColorPicker } from "./ColorPicker";
import { EditWrapper } from "./EditWrapper";
import { Input } from "./Input";

type Index = { index: number };

interface IHeadingProps {
  text: string;
  color: "#000";
}

export type HeadingContent = { type: "heading"; props: IHeadingProps };

export const Heading: FC<IHeadingProps & Index> = ({ text, index, color }) => {
  return (
    <EditWrapper index={index}>
      <h2 className="text-center my-4 font-bold text-4xl" style={{ color }}>
        {text}
      </h2>
    </EditWrapper>
  );
};

export const EditHeading: FC = () => {
  const { data } = useAppSelector((state) => state.content);
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const content = getContent(data, editContentIndex);
  const dispatch = useAppDispatch();
  if (content.type === "heading") {
    return (
      <>
        <Input
          id="text-input"
          onChange={(e) => {
            dispatch(
              updateContentWithNewProps(
                content,
                { text: e.currentTarget.value },
                editContentIndex
              )
            );
          }}
          value={content.props.text}
        />
        <ColorPicker
          id="textcolor"
          currentColor={content.props.color}
          label="Text Color"
          onSelectColor={(color) =>
            dispatch(
              updateContentWithNewProps(content, { color }, editContentIndex)
            )
          }
        />
      </>
    );
  }
  return null;
};
