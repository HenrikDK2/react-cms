import { LinkContent } from "../components/Link";
import { HeadingContent } from "../components/Heading";
import { ProductListContent } from "../components/ProductList";

export type Content = LinkContent | HeadingContent | ProductListContent;
export type ContentArr = Array<Content>;
export type EditContentIndex = number | null;
export type DragItem = number | null;

export interface ContentState {
  data: ContentArr;
  dragItem: DragItem;
}
