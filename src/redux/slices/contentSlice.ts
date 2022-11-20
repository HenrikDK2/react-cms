import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultHeading, defaultMarkdown, defaultLink } from "../../data/default";
import { Content, ContentState, DragItem } from "../../types";

const stateInStorage = (): ContentState | undefined => {
  const strData = sessionStorage.getItem("contentState");

  if (strData) {
    return JSON.parse(strData) as ContentState;
  }
};

const initalState: ContentState = stateInStorage() || {
  data: [defaultHeading, defaultMarkdown, defaultLink],
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
