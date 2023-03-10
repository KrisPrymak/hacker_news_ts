import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { commentItemType, newItemType, stateType } from "../types";

const instance = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/",
  withCredentials: false,
});


export const fetchComments = createAsyncThunk(
  "news/fetchComments",
  async function (listId: any, { rejectWithValue }) {
    try {
      let commentsList: Array<commentItemType> = [];
      if (listId) {
        for (let i = 0; i < listId.length; i++) {
          const response = await instance.get(
            `/item/${listId[i]}.json?print=pretty`
          );
          const commentItem: commentItemType = {
            by: response.data.by,
            id: response.data.id,
            kids: response.data.kids,
            parent: response.data.parent,
            text: response.data.text,
            time: response.data.time,
            type: response.data.type,
          };
          if (commentItem.kids) {
            let subComms: Array<commentItemType> = [];
            for (let i = 0; i < commentItem.kids.length; i++) {
              const response = await instance.get(
                `/item/${commentItem.kids[i]}.json?print=pretty`
              );
              const subCommentItem: commentItemType = {
                by: response.data.by,
                id: response.data.id,
                kids: response.data.kids,
                parent: response.data.parent,
                text: response.data.text,
                time: response.data.time,
                type: response.data.type,
              };
              subComms.push(subCommentItem);
            }
            commentItem.kids = subComms;
          }
          commentsList.push(commentItem);
        }
      }
      return commentsList as any;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async function (_, { rejectWithValue}: any ) {
    try {
      let newsData: Array<newItemType> = [];
      const response = await instance.get("/newstories.json?print=pretty");
      const idList = response.data
        .sort((a: any, b: any) => {
          return a.time < b.time ? -1 : 1;
        })
        .slice(0, 100);
      for (let i = 0; i < idList.length; i++) {
        const itemResponse = await instance.get(
          `/item/${idList[i]}.json?print=pretty`
        );
        const newItem: newItemType = {
          by: itemResponse.data.by,
          descendants: itemResponse.data.descendants,
          id: itemResponse.data.id,
          score: itemResponse.data.score,
          kids: itemResponse.data.kids,
          time: itemResponse.data.time,
          title: itemResponse.data.title,
          type: itemResponse.data.type,
          url: itemResponse.data.url,
        };
        newsData.push(newItem);
      }
      return newsData as any;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const setPending: (state: any) => void = (state) => {
  state.status = "pending";
  state.error = null;
}
const setRejected: (state: any, action: any) => void = (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
}

const newsSlice = createSlice({
  name: "news",
  initialState: {
    commentsList: null,
    list: [],
    status: null,
    error: null,
  } as stateType,
  reducers: {
    updateCommentList: (state, action) => {
      state.commentsList = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, setPending);
    builder.addCase(fetchComments.pending, setPending);

    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = "resolved";
      state.list = action.payload;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "resolved";
      state.commentsList = action.payload;
    });

    builder.addCase(fetchNews.rejected, setRejected);
    builder.addCase(fetchComments.rejected, setRejected);
  },
});

export const { updateCommentList } = newsSlice.actions;

export default newsSlice.reducer;
