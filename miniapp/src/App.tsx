import React from 'react';
import {Route, Routes} from "react-router-dom";
import './App.scss';
import {ROUTES} from "./routes";
import MyCardsPage from "./pages/MyCardsPage/MyCardsPage";
import CardPage from "./pages/CardPage/CardPage";
import {AppRoot} from "@telegram-apps/telegram-ui";
import '@telegram-apps/telegram-ui/dist/styles.css';
import CardsHistory from './pages/CardsHistory/CardsHistory';

function App() {
  return (
    <AppRoot className="App">
      <Routes>
          <Route index element={<MyCardsPage />}/>
          <Route path={ROUTES.MY_CARDS} element={<MyCardsPage />}/>
          <Route path={ROUTES.CARD} element={<CardPage />} />
          <Route path={ROUTES.HISTORY} element={<CardsHistory />} />
      </Routes>
    </AppRoot>
  );
}

export default App;
