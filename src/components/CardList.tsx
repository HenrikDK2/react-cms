import { FC } from "react";
import placeholderImage from "../images/placeholder.gif";
import { updateContent } from "../redux/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getContent } from "../utils";
import { EditWrapper } from "./EditWrapper";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

export interface Item {
  src?: string;
  alt: string;
  text: string;
  title: string;
}

type Index = { index: number };

export interface ICardListProps {
  items: Item[];
}

export interface CardListContent {
  type: "cardList";
  props: ICardListProps;
}

export const CardList: FC<ICardListProps & Index> = ({ items, index }) => (
  <EditWrapper index={index}>
    <ul className="flex justify-between my-8">
      {items.map(({ alt, src, title, text }, i) => (
        <li key={i} className="w-[300px]">
          <img
            className="block min-h-[224px]"
            alt={alt}
            src={src || placeholderImage}
          />
          <h3 className="font-bold text-2xl mt-2">{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ul>
  </EditWrapper>
);

export const EditCardList: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.content);
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const content = getContent(data, editContentIndex) as CardListContent;

  if (content.type === "cardList" && typeof editContentIndex === "number") {
    return (
      <ul>
        {content.props.items.map((item, i) => {
          return (
            <li key={i}>
              <h3 className="font-bold text-lg my-2">{i + 1}. Item</h3>
              <Input
                id={"title-" + i}
                value={item.title}
                label="Title"
                onChange={(e) => {
                  let newContent: CardListContent = JSON.parse(
                    JSON.stringify(content)
                  );
                  newContent.props.items[i].title = e.currentTarget.value;

                  dispatch(
                    updateContent({
                      content: newContent,
                      index: editContentIndex,
                    })
                  );
                }}
              />
              <Textarea
                id={"text-" + i}
                label="Content"
                value={item.text}
                onChange={(e) => {
                  let newContent: CardListContent = JSON.parse(
                    JSON.stringify(content)
                  );
                  newContent.props.items[i].text = e.currentTarget.value;

                  dispatch(
                    updateContent({
                      content: newContent,
                      index: editContentIndex,
                    })
                  );
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};