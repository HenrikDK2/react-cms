import { CSSProperties, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { HexColor, UniversalContentProps } from "../../types";
import { getContent, updateContentWithNewProps } from "../../utils";
import { ColorPicker } from "../edit/ColorPicker";
import { ContentWrapper } from "./Wrapper";
import { Input } from "../Input";
import { WeightPicker } from "../edit/WeightPicker";
import { SpacingSliders } from "../edit/SpacingSliders";
import { AlignPicker } from "../edit/AlignPicker";

type Index = { index: number };

type ILinkProps = {
  text: string;
  weight: CSSProperties["fontWeight"];
  color: HexColor;
  href: string;
  bgcolor: HexColor;
  align: CSSProperties["textAlign"];
} & UniversalContentProps;

export type LinkContent = { type: "link"; props: ILinkProps };

export const Link: FC<ILinkProps & Index> = ({ text, bgcolor, color, weight, href, align, index }) => {
  let margin = "0 auto";

  if (align === "left") margin = "0 auto 0 0";
  if (align === "right") margin = "0 0 0 auto";

  return (
    <ContentWrapper index={index}>
      <a
        href={href}
        style={{ backgroundColor: bgcolor, color, fontWeight: weight, margin }}
        className="px-4 py-2 font-bold rounded-lg no-underline max-w-max block my-2"
      >
        {text}
      </a>
    </ContentWrapper>
  );
};

export const EditLink: FC = () => {
  const { data } = useAppSelector((state) => state.content);
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const content = getContent(data, editContentIndex) as LinkContent;
  const dispatch = useAppDispatch();

  return (
    <>
      <Input
        id="text-input"
        onChange={(e) => {
          dispatch(updateContentWithNewProps(content, { text: e.currentTarget.value }, editContentIndex));
        }}
        value={content.props.text}
      />
      <Input
        id="href-input"
        label="Redirect"
        onChange={(e) => {
          dispatch(updateContentWithNewProps(content, { href: e.currentTarget.value }, editContentIndex));
        }}
        value={content.props.href}
      />
      <AlignPicker content={content} />
      <WeightPicker content={content} />
      <ColorPicker
        id="bgcolor"
        currentColor={content.props.bgcolor}
        label="Background Color"
        onSelectColor={(bgcolor) => dispatch(updateContentWithNewProps(content, { bgcolor }, editContentIndex))}
      />
      <ColorPicker
        id="textcolor"
        currentColor={content.props.color}
        label="Text Color"
        onSelectColor={(color) => dispatch(updateContentWithNewProps(content, { color }, editContentIndex))}
      />
      <SpacingSliders content={content} editContentIndex={editContentIndex} />
    </>
  );
};
