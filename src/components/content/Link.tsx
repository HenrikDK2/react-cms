import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FontWeight, HexColor } from "../../types";
import { getContent, updateContentWithNewProps } from "../../utils";
import { ColorPicker } from "../edit/ColorPicker";
import { ContentWrapper } from "../edit/Wrapper";
import { Input } from "../Input";
import { WeightPicker } from "../edit/WeightPicker";

type Index = { index: number };

interface ILinkProps {
  text: string;
  weight: FontWeight;
  color: HexColor;
  href: string;
  bgcolor: HexColor;
}

export type LinkContent = { type: "link"; props: ILinkProps };

export const Link: FC<ILinkProps & Index> = ({ text, bgcolor, color, weight, href, index }) => (
  <ContentWrapper index={index}>
    <a
      href={href}
      style={{ backgroundColor: bgcolor, color, fontWeight: weight }}
      className="px-4 py-2 font-bold rounded-lg mx-auto max-w-max block my-2"
    >
      {text}
    </a>
  </ContentWrapper>
);

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
    </>
  );
};
