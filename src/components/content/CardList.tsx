import { FC } from "react";
import { closeMenu, setEditContentIndex } from "../../redux/slices/adminSlice";
import { updateContent, deleteContent } from "../../redux/slices/contentSlice";
import { UniversalContentProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getContent } from "../../utils";
import { ContentWrapper } from "./Wrapper";
import { Textarea } from "../Textarea";
import { SpacingSliders } from "../edit/SpacingSliders";
import { defaultCardItem } from "../../data/default";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export interface CardItem {
  content: string;
}

type Index = { index: number };

export type ICardListProps = {
  items: CardItem[];
} & UniversalContentProps;

export interface CardListContent {
  type: "cardList";
  props: ICardListProps;
}

export const CardList: FC<ICardListProps & Index> = ({ items, index }) => (
  <ContentWrapper index={index}>
    <ul className="grid grid-cols-3 gap-16 my-8">
      {items.map(({ content }, i) => (
        <li key={i}>
          <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
        </li>
      ))}
    </ul>
  </ContentWrapper>
);

export const EditCardList: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.content);
  const { editContentIndex } = useAppSelector((state) => state.admin);
  const content = getContent(data, editContentIndex) as CardListContent;

  if (content.type === "cardList" && typeof editContentIndex === "number") {
    const handleOnChange = (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      i: number,
      property: keyof CardItem
    ) => {
      let newContent: CardListContent = JSON.parse(JSON.stringify(content));
      newContent.props.items[i][property] = e.currentTarget.value;

      dispatch(
        updateContent({
          content: newContent,
          index: editContentIndex,
        })
      );
    };

    const handleRemoveItem = () => {
      if (content.props.items.length < 2) {
        dispatch(deleteContent(editContentIndex));
        dispatch(setEditContentIndex(null));
        dispatch(closeMenu());
      } else {
        const newContent: CardListContent = JSON.parse(JSON.stringify(content));
        newContent.props.items.pop();
        dispatch(updateContent({ content: newContent, index: editContentIndex }));
      }
    };

    const handleAddItem = () => {
      const newContent: CardListContent = JSON.parse(JSON.stringify(content));
      newContent.props.items.push(defaultCardItem);
      dispatch(updateContent({ content: newContent, index: editContentIndex }));
    };

    return (
      <>
        <SpacingSliders content={content} editContentIndex={editContentIndex} />
        <ul>
          {content.props.items.map((item, i) => (
            <li key={i}>
              <h3 className="font-bold text-lg my-2">{i + 1}. Item</h3>
              <Textarea
                id={"text-" + i}
                label="Content"
                rows={10}
                value={item.content}
                onChange={(e) => handleOnChange(e, i, "content")}
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-6">
          <button onClick={handleRemoveItem} className="bg-red-600 py-2 px-4 rounded-md text-white font-bold flex-1">
            Remove
          </button>
          <button
            onClick={handleAddItem}
            className="bg-green-600 py-2 px-4 rounded-md text-white font-bold flex-1 ml-4"
          >
            Add
          </button>
        </div>
      </>
    );
  }
  return null;
};
