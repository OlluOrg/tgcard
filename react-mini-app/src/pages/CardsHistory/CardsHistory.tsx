import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import TopMenu from "../../components/TopMenu/TopMenu";
import ModalAddCard from "../../components/ModalAddCard/ModalAddCard";
import ModalDeleteCard from "../../components/ModalDeleteCard/ModalDeleteCard";
import CardList from "../../components/CardList/CardList";
import MyCardsBottomMenu from "../../components/MyCardsBottomMenu/MyCardsBottomMenu";
import CardsHistoryList from '../../components/CardsHistory/CardsHistoryList';
import CardsHistoryBottomMenu from '../../components/CardsHistoryBottomMenu/CardsHistoryBottomMenu';

const CardsHistory = () => {


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