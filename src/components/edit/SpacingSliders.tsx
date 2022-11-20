import React from "react";
import { useDispatch } from "react-redux";
import { Content, EditContentIndex } from "../../types";
import { updateContentWithNewProps } from "../../utils";
import { Input } from "../Input";

interface SpacingSlidersProps {
  editContentIndex: EditContentIndex;
  content: Content;
}
export const SpacingSliders: React.FC<SpacingSlidersProps> = ({ content, editContentIndex }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Input
        type="range"
        label={"Margin top - " + content.props.mt}
        id="margin-top"
        min={0}
        max={100}
        step={2}
        value={content.props.mt.toString()}
        onChange={(e) => dispatch(updateContentWithNewProps(content, { mt: e.currentTarget.value }, editContentIndex))}
      />
      <Input
        type="range"
        label={"Margin bottom - " + content.props.mb}
        id="margin-bottom"
        min={0}
        max={100}
        step={2}
        value={content.props.mb.toString()}
        onChange={(e) => dispatch(updateContentWithNewProps(content, { mb: e.currentTarget.value }, editContentIndex))}
      />
      <Input
        type="range"
        label={"Padding horizontal - " + content.props.px}
        id="padding-horizontal"
        min={0}
        max={100}
        step={2}
        value={content.props.px.toString()}
        onChange={(e) => dispatch(updateContentWithNewProps(content, { px: e.currentTarget.value }, editContentIndex))}
      />
      <Input
        type="range"
        label={"Padding vertical - " + content.props.py}
        id="padding-vertical"
        min={0}
        max={100}
        step={2}
        value={content.props.py.toString()}
        onChange={(e) => dispatch(updateContentWithNewProps(content, { py: e.currentTarget.value }, editContentIndex))}
      />
    </>
  );
};
