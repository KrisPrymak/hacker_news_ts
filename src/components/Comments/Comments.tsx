import React from "react";
import { commentItemType } from "../../types";
import style from "./Comments.module.css";
import CommItem from "./CommItem";


const Comments = ({ comList}: { comList: null | Array<commentItemType> }): JSX.Element => {

  return (
    <div className={style.comments}>
      {comList ? (
        <div>
          <h3>Comments: {comList.length}</h3>
          {comList.map((item) => {
            return <CommItem key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <h2>Comments: 0</h2>
      )}
    </div>
  );
};

export default Comments;

