import { FC } from "react";
import { HexColor } from "../types";

interface IColorPickerProps {
  onSelectColor: (color: HexColor) => void;
  currentColor: HexColor;
  id: string;
  label: string;
}

const colors: HexColor[] = [
  "#ef4444",
  "#44bcef",
  "#44ef8b",
  "#fff",
  "#000",
  "#006ffb",
  "#fa7f1e",
  "#6033f5",
  "#f9e381",
  "#ea4c89",
];

export const ColorPicker: FC<IColorPickerProps> = ({
  onSelectColor,
  id,
  currentColor,
  label,
}) => (
  <div className="my-4">
    <label className="mb-2" htmlFor={id}>
      {label}
    </label>

    <ul id={id} className="flex flex-wrap mt-2 gap-2">
      {colors.map((color) => (
        <li
          tabIndex={0}
          key={color}
          className={`w-10 h-10 rounded-full transition-opacity cursor-pointer border-2 border-solid border-[#e7eae9] ${
            color === currentColor ? "opacity-100" : "opacity-20"
          }`}
          onClick={() => onSelectColor(color)}
          style={{ backgroundColor: color }}
        />
      ))}
    </ul>
  </div>
);
