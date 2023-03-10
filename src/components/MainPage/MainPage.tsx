import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/newsSlice";
import { AppThunkDispatch, newItemType } from "../../types";
import Navbar from "../Navbar/Navbar";
import NewsItem from "../NewsItem/NewsItem";
import style from "./MainPage.module.css";

const MainPage = (): JSX.Element => {
  const newsList = useSelector((state: any) => state.news.list);
  const dispatch = useDispatch<AppThunkDispatch>()
  const { status, error } = useSelector((state: any) => state.news);

  const updateNews = () => {
    dispatch(fetchNews());
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      updateNews();
    }, 60000);
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar
        status={status}
        handleClick={updateNews}
        text="Search for more news"
        title="news"
        updateComments={() => {}}
      />
      <div className={style.mainPage}>
        {error && <h2>An error occured: {error}</h2>}
        <div className={style.newsList}>
          {newsList.map((item: newItemType, index: number) => (
            <NewsItem key={item.id} newItem={item} index={index + 1}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
