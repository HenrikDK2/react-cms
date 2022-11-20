/* eslint-disable @typescript-eslint/no-array-constructor */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeadingContent } from "../../components/content/Heading";
import { LinkContent } from "../../components/content/Link";
import { CardListContent } from "../../components/content/CardList";
import { Content, ContentState, DragItem } from "../../types";
import { MarkdownContent } from "../../components/content/Markdown";

const universalProps = {
  px: 0,
  py: 0,
  mt: 0,
  mb: 0,
};

export const defaultCardItem = {
  alt: "placeholder",
  text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, voluptatibus minus odit ad similique exercitationem doloribus!",
  title: "Example title",
};

export const defaultCardList: CardListContent = {
  type: "cardList",
  props: {
    items: [defaultCardItem, defaultCardItem, defaultCardItem],
    ...universalProps,
  },
};

export const defaultLink: LinkContent = {
  type: "link",
  props: {
    text: "Redirect to google.dk",
    weight: "bold",
    href: "https://google.dk",
    bgcolor: "#d21b1b",
    color: "#fff",
    ...universalProps,
  },
};

export const defaultHeading: HeadingContent = {
  type: "heading",
  props: { text: "This is a heading", color: "#000", weight: "bold", ...universalProps },
};

export const defaultMarkdown: MarkdownContent = {
  type: "markdown",
  props: {
    content: `Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.`,
    ...universalProps,
  },
};

const stateInStorage = (): ContentState | undefined => {
  const strData = sessionStorage.getItem("contentState");
  if (strData) {
    return JSON.parse(strData) as ContentState;
  }
};

const initalState: ContentState = stateInStorage() || {
  data: [defaultHeading, defaultCardList, defaultLink],
  dragItem: 1,
};

export const contentArrSlice = createSlice({
  name: "content",
  initialState: initalState,
  reducers: {
    addContent: (state, action: PayloadAction<Content>) => {
      state.data.push(action.payload);
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
    updateContent: (state, action: PayloadAction<{ content: Content; index: number }>) => {
      state.data[action.payload.index] = action.payload.content;
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
    deleteContent: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((_, i) => i !== action.payload);
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
    swapContent: (state, action: PayloadAction<[number, number]>) => {
      const temp = state.data[action.payload[0]];
      state.data[action.payload[0]] = state.data[action.payload[1]];
      state.data[action.payload[1]] = temp;
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
    updateDragItem: (state, action: PayloadAction<DragItem>) => {
      state.dragItem = action.payload;
    },
  },
});

export const { swapContent, deleteContent, addContent, updateDragItem, updateContent } = contentArrSlice.actions;
export default contentArrSlice.reducer;
