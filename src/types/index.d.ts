import { LinkContent } from "../components/content/Link";
import { HeadingContent } from "../components/content/Heading";
import { CardListContent } from "../components/content/CardList";
import { MarkdownContent } from "../components/content/Markdown";

export type HexColor = `#${string}`;
export type Content = LinkContent | HeadingContent | CardListContent | MarkdownContent;
export type ContentArr = Array<Content>;
export type EditContentIndex = number | null;
export type DragItem = number;
export type FontWeight = "bold" | "normal";
export type UniversalContentProps = {
  px: number;
  py: number;
  mb: number;
  mt: number;
};

export interface ContentState {
  data: ContentArr;
  dragItem: DragItem;
}
