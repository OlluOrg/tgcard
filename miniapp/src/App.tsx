import React, {useEffect} from 'react';
import {generatePath, Route, Routes, useNavigate} from "react-router-dom";
import './App.scss';
import {ROUTES} from "./routes";
import MyCardsPage from "./pages/MyCardsPage/MyCardsPage";
import CardPage from "./pages/CardPage/CardPage";
import {AppRoot} from "@telegram-apps/telegram-ui";
import '@telegram-apps/telegram-ui/dist/styles.css';
import CardsHistory from './pages/CardsHistory/CardsHistory';
import {getUserId} from "./utils/getUserId";
import {useAppDispatch} from "./hooks/hooks";
import {addHistory} from "./store/apiThunks/historyThunks";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = getUserId();

    useEffect(() => {
        const tg = Telegram.WebApp;
        const regex = /cardId_(\w+)/;
        const initData = tg.initData
        const match = initData.match(regex);

        if (match) {
            sessionStorage.setItem('cardId', match[1]);
            navigate(generatePath(ROUTES.CARD, { cardId: match[1] }));
            dispatch(addHistory({userId: userId, businessCardId: match[1]}))
        }
    }, [])

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
