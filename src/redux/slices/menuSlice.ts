import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditContentIndex } from "../../types/content";

interface InitialState {
  editContentIndex: EditContentIndex;
  isOpen: Boolean;
}

const initalState: InitialState = {
  editContentIndex: null,
  isOpen: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initalState,
  reducers: {
    openMenu(state) {
      state.isOpen = true;
    },
    closeMenu(state) {
      state.isOpen = false;
    },
    setEditContentIndex(state, action: PayloadAction<number>) {
      state.editContentIndex = action.payload;
    },
  },
});

export const { openMenu, closeMenu, setEditContentIndex } = menuSlice.actions;

export default menuSlice.reducer;
