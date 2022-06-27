import { LinkContent } from "../components/Link";
import { HeadingContent } from "../components/Heading";
import { CardListContent } from "../components/CardList";

export type Content = LinkContent | HeadingContent | CardListContent;
export type ContentArr = Array<Content>;
export type EditContentIndex = number | null;
export type DragItem = number | null;

export interface ContentState {
  data: ContentArr;
  dragItem: DragItem;
}
