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

export interface IProductListProps {
  items: Item[];
}

export interface ProductListContent {
  type: "productList";
  props: IProductListProps;
}

export const ProductList: FC<IProductListProps & Index> = ({
  items,
  index,
}) => (
  <EditWrapper index={index}>
    <ul className="flex justify-between my-8">
      {items.map(({ alt, src, title, text }) => (
        <li className="w-[300px]">
          <img className="block" alt={alt} src={src || placeholderImage} />
          <h3 className="font-bold text-2xl mt-2">{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ul>
  </EditWrapper>
);

export const EditProductList: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.content);
  const { editContentIndex } = useAppSelector((state) => state.menu);
  const content = getContent(data, editContentIndex) as ProductListContent;

  if (content.type === "productList" && typeof editContentIndex === "number") {
    return (
      <ul>
        {content.props.items.map((item, i) => {
          return (
            <li key={i}>
              <h3 className="font-bold text-lg my-2">{i + 1}. Product</h3>
              <Input
                id={"title-" + i}
                value={item.title}
                label="Title"
                onChange={(e) => {
                  let newContent: ProductListContent = JSON.parse(
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
                value={item.text}
                onChange={(e) => {
                  let newContent: ProductListContent = JSON.parse(
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
