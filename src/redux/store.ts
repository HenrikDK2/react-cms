import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "./slices/contentSlice";
import menuSlice from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    content: contentSlice,
    menu: menuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const StoreProvider = Provider;
