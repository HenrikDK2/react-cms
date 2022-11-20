import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getContent, updateContentWithNewProps } from "../../utils";
import { ContentWrapper } from "./Wrapper";
import { Textarea } from "../Textarea";
import { UniversalContentProps } from "../../types";
import { SpacingSliders } from "../edit/SpacingSliders";

type Index = { index: number };

type MarkdownProps = {
  children?: React.ReactNode;
  content: string;
} & UniversalContentProps;

export type MarkdownContent = { type: "markdown"; props: MarkdownProps };

export const Markdown: React.FC<MarkdownProps & Index> = (props) => (
  <ContentWrapper index={props.index}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.content}</ReactMarkdown>
  </ContentWrapper>
);

export const EditMarkdown: React.FC = () => {
  const { data } = useAppSelector((state) => state.content);
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const content = getContent(data, editContentIndex);
  const dispatch = useAppDispatch();

  if (content.type === "markdown") {
    return (
      <>
        <Textarea
          label="Markdown Content"
          id="content"
          rows={20}
          value={content.props.content}
          onChange={(e) =>
            dispatch(updateContentWithNewProps(content, { content: e.currentTarget.value }, editContentIndex))
          }
        />
        <SpacingSliders content={content} editContentIndex={editContentIndex} />
      </>
    );
  }

  return null;
};
