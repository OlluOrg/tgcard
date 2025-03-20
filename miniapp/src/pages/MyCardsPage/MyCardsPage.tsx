import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import TopMenu from "../../components/TopMenu/TopMenu";
import ModalAddCard from "../../components/ModalAddCard/ModalAddCard";
import ModalDeleteCard from "../../components/ModalDeleteCard/ModalDeleteCard";
import CardList from "../../components/CardList/CardList";
import MyCardsBottomMenu from "../../components/MyCardsBottomMenu/MyCardsBottomMenu";
import ModalSettingsCard from "../../components/ModalSettingsCard/ModalSettingsCard";

const MyCardsPage = () => {


    return (
        <div>
            <TopMenu />

            <CardList />

            <MyCardsBottomMenu />

            <ModalAddCard />

            <ModalDeleteCard />
            
            <ModalSettingsCard />
        </div>
    );
};

export default MyCardsPage;