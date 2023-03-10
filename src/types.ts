import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";

export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export type commentItemType = {
  by: string;
  id: number;
  kids: Array<number> | Array<commentItemType> | null;
  parent: number;
  text: string;
  time: number;
  type: string;
};

export type newItemType = {
  by: string;
  descendants: number;
  id: number;
  score: number;
  kids: Array<number> | Array<commentItemType> | null;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type stateType = {
  commentsList: null | Array<commentItemType>;
  list: any;
  status: null | string;
  error: null | string;
};
