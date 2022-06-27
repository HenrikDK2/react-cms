import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditContentIndex } from "../../types/content";

interface InitialState {
  editContentIndex: EditContentIndex;
  isOpen: boolean;
  adminMode: boolean;
}

const initalState: InitialState = {
  editContentIndex: null,
  isOpen: false,
  adminMode: false,
};

export const menuSlice = createSlice({
  name: "admin",
  initialState: initalState,
  reducers: {
    enableAdminMode(state) {
      state.adminMode = true;
    },
    disableAdminMode(state) {
      state.adminMode = false;
    },
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

export const {
  openMenu,
  enableAdminMode,
  disableAdminMode,
  closeMenu,
  setEditContentIndex,
} = menuSlice.actions;

export default menuSlice.reducer;
