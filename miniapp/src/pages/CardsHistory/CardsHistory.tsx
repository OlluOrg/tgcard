import React, {useEffect} from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import TopMenu from "../../components/TopMenu/TopMenu";
import ModalAddCard from "../../components/ModalAddCard/ModalAddCard";
import ModalDeleteCard from "../../components/ModalDeleteCard/ModalDeleteCard";
import CardList from "../../components/CardList/CardList";
import MyCardsBottomMenu from "../../components/MyCardsBottomMenu/MyCardsBottomMenu";
import CardsHistoryList from '../../components/CardsHistory/CardsHistoryList';
import CardsHistoryBottomMenu from '../../components/CardsHistoryBottomMenu/CardsHistoryBottomMenu';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Loader from "../../components/Loader/Loader";
import {getHistory} from "../../store/apiThunks/historyThunks";
import {getUserId} from "../../utils/getUserId";

const CardsHistory = () => {
    const dispatch = useAppDispatch();

    const {isLoading} = useAppSelector(state => state.myCards);

    const userId = getUserId();

    useEffect(() => {
        dispatch(getHistory({userId: userId}))
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <TopMenu />

            <CardsHistoryList />

            <CardsHistoryBottomMenu />

            <ModalDeleteCard />
        </div>
    );
};

export default CardsHistory;