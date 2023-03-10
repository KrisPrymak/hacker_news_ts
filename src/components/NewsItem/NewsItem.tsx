import React from 'react';
import { NavLink } from 'react-router-dom';
import { newItemType } from '../../types';
import style from './NewsItem.module.css';

const NewsItem = ({newItem, index}: { newItem: newItemType, index: number }): JSX.Element => {

    return (
        <NavLink className={style.newItem} to={`/${newItem.id}`}>
           <div className={style.newItem__container}>
           <h2>{index}. {newItem.title}</h2>
            <div>
            <div className={style.mainInfo}>
            <p>Nikname: {newItem.by}</p>
            <p>Score: {newItem.score}</p>
            </div>
            <p className={style.date}>Date: {new Date(newItem.time).toDateString()}</p>
            </div>
           </div>
        </NavLink>
    );
};

export default NewsItem;