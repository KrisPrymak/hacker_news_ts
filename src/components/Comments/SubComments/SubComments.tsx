import React from "react";
import { commentItemType } from "../../../types";
import style from "./SubComments.module.css";

const SubComments = ({ list }: { list: any }): JSX.Element => {
  return (
    <div className={style.subComments}>
      <div className={style.subCommentItem}>
        {list.map((i: commentItemType) => {
          return (
            <div key={i.id} className={style.commentItem}>
              <p className={style.commentTime}>
                {new Date(i.time).toDateString()}
              </p>
              <h4>{i.by}:</h4>
              <p className={style.commentText}>{i.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubComments;
