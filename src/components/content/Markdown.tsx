import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getContent, updateContentWithNewProps } from "../../utils";
import { ContentWrapper } from "./Wrapper";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

type Index = { index: number };

interface MarkdownProps {
  children?: React.ReactNode;
  px: number;
  py: number;
  mb: number;
  mt: number;
  content: string;
}

export type MarkdownContent = { type: "markdown"; props: MarkdownProps };

export const Markdown: React.FC<MarkdownProps & Index> = (props) => (
  <ContentWrapper index={props.index}>
    <div style={{ padding: `${props.py}px ${props.px}px`, marginTop: `${props.mt}px`, marginBottom: `${props.mb}px` }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.content}</ReactMarkdown>
    </div>
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
        <Input
          type="range"
          label={"Margin top - " + content.props.mt}
          id="margin-top"
          min={0}
          max={100}
          step={2}
          value={content.props.mt.toString()}
          onChange={(e) =>
            dispatch(updateContentWithNewProps(content, { mt: e.currentTarget.value }, editContentIndex))
          }
        />
        <Input
          type="range"
          label={"Margin bottom - " + content.props.mb}
          id="margin-bottom"
          min={0}
          max={100}
          step={2}
          value={content.props.mb.toString()}
          onChange={(e) =>
            dispatch(updateContentWithNewProps(content, { mb: e.currentTarget.value }, editContentIndex))
          }
        />
        <Input
          type="range"
          label={"Padding horizontal - " + content.props.px}
          id="padding-horizontal"
          min={0}
          max={100}
          step={2}
          value={content.props.px.toString()}
          onChange={(e) =>
            dispatch(updateContentWithNewProps(content, { px: e.currentTarget.value }, editContentIndex))
          }
        />
        <Input
          type="range"
          label={"Padding vertical - " + content.props.py}
          id="padding-vertical"
          min={0}
          max={100}
          step={2}
          value={content.props.py.toString()}
          onChange={(e) =>
            dispatch(updateContentWithNewProps(content, { py: e.currentTarget.value }, editContentIndex))
          }
        />
      </>
    );
  }

  return null;
};
