import React, { FC } from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  id: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  label?: string;
};

export const Input: FC<InputProps> = (props) => (
  <div className="my-4 flex flex-col">
    <label className="mb-2" htmlFor={props.id}>
      {props.label || "Text content"}
    </label>
    <input className="border-[#e7eae9] border-2 rounded-lg px-4 py-2" placeholder="Text" {...props} />
  </div>
);
