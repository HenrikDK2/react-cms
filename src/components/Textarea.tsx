import React, { FC } from "react";

type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
  id: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  label?: string;
};

export const Textarea: FC<TextareaProps> = (props) => {
  return (
    <div className="my-4 flex flex-col">
      <label className="mb-2" htmlFor={props.id}>
        {props.label || "Text content"}
      </label>
      <textarea
        rows={5}
        className="border-[#e7eae9] border-2 rounded-lg px-4 py-2"
        placeholder="Text content"
        {...props}
      />
    </div>
  );
};
