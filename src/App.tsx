import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import NewsPage from './components/NewsPage/NewsPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path={'/:id'} element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
