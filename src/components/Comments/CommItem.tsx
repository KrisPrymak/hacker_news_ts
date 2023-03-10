import { Button } from "@mui/material";
import React, { useState } from "react";
import { commentItemType } from "../../types";
import style from "./Comments.module.css";
import SubComments from "./SubComments/SubComments";

const CommItem = ({ item }: { item: commentItemType }): JSX.Element => {
  const [isOpenSubComms, setIsOpenSubComms] = useState(false);
  return (
    <div className={style.commentItem}>
      <p className={style.commentTime}>{new Date(item.time).toDateString()}</p>
      <h4>{item.by}:</h4>
      <p className={style.commentText}>{item.text}</p>
      <div>
        {item.kids ? (
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenSubComms(!isOpenSubComms);
            }}
          >
            {isOpenSubComms ? "Close subcomments" : "Check more comments"}
          </Button>
        ) : (
          ""
        )}
      </div>
      {isOpenSubComms && item.kids && <SubComments list={item.kids} />}
    </div>
  );
};

export default CommItem;
