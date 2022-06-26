/* eslint-disable @typescript-eslint/no-array-constructor */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeadingContent } from "../../components/Heading";
import { LinkContent } from "../../components/Link";
import { ProductListContent } from "../../components/ProductList";
import { Content, ContentState, DragItem } from "../../types/content";

const stateInStorage = (): ContentState | undefined => {
  const strData = sessionStorage.getItem("contentState");
  if (strData) {
    return JSON.parse(strData) as ContentState;
  }
};

const defaultProductItem = {
  alt: "placeholder",
  text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, voluptatibus minus odit ad similique exercitationem doloribus!",
  title: "Example title",
};

export const defaultProductList: ProductListContent = {
  type: "productList",
  props: {
    items: [defaultProductItem, defaultProductItem, defaultProductItem],
  },
};

export const defaultLink: LinkContent = {
  type: "link",
  props: {
    text: "Click here",
    href: "https://google.dk",
    bgcolor: "#ef4444",
    color: "#fff",
  },
};

export const defaultHeading: HeadingContent = {
  type: "heading",
  props: { text: "This is a heading", color: "#000" },
};

const initalState: ContentState = stateInStorage() || {
  data: [defaultHeading, defaultProductList, defaultLink],
  dragItem: null,
};

export const contentArrSlice = createSlice({
  name: "content",
  initialState: initalState,
  reducers: {
    addContent: (state, action: PayloadAction<Content>) => {
      state.data.push(action.payload);
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
    updateContent: (
      state,
      action: PayloadAction<{ content: Content; index: number }>
    ) => {
      state.data[action.payload.index] = action.payload.content;
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
    deleteContent: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
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
      sessionStorage.setItem("contentState", JSON.stringify(state));
    },
  },
});

export const {
  swapContent,
  deleteContent,
  addContent,
  updateDragItem,
  updateContent,
} = contentArrSlice.actions;

export default contentArrSlice.reducer;
