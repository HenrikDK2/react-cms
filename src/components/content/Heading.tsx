import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FontWeight, HexColor, UniversalContentProps } from "../../types";
import { getContent, updateContentWithNewProps } from "../../utils";
import { ColorPicker } from "../edit/ColorPicker";
import { ContentWrapper } from "./Wrapper";
import { Input } from "../Input";
import { WeightPicker } from "../edit/WeightPicker";
import { SpacingSliders } from "../edit/SpacingSliders";

type Index = { index: number };

type IHeadingProps = {
  text: string;
  color: HexColor;
  weight: FontWeight;
} & UniversalContentProps;

export type HeadingContent = { type: "heading"; props: IHeadingProps };

export const Heading: FC<IHeadingProps & Index> = ({ text, index, color, weight }) => (
  <ContentWrapper index={index}>
    <h2 className="text-center my-4 font-bold text-4xl" style={{ color, fontWeight: weight }}>
      {text}
    </h2>
  </ContentWrapper>
);

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
            dispatch(updateContentWithNewProps(content, { text: e.currentTarget.value }, editContentIndex));
          }}
          value={content.props.text}
        />
        <WeightPicker content={content} />
        <ColorPicker
          id="textcolor"
          currentColor={content.props.color}
          label="Text Color"
          onSelectColor={(color) => dispatch(updateContentWithNewProps(content, { color }, editContentIndex))}
        />
        <SpacingSliders content={content} editContentIndex={editContentIndex} />
      </>
    );
  }
  return null;
};
