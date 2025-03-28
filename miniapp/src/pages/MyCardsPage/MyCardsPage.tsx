import React, {useEffect} from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import TopMenu from "../../components/TopMenu/TopMenu";
import ModalAddCard from "../../components/ModalAddCard/ModalAddCard";
import ModalDeleteCard from "../../components/ModalDeleteCard/ModalDeleteCard";
import CardList from "../../components/CardList/CardList";
import MyCardsBottomMenu from "../../components/MyCardsBottomMenu/MyCardsBottomMenu";
import ModalSettingsCard from "../../components/ModalSettingsCard/ModalSettingsCard";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {readBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {useLocation} from "react-router-dom";
import CopyLinkSnackbar from "../../components/CopyLinkSnackbar/CopyLinkSnackbar";
import Loader from "../../components/Loader/Loader";

const MyCardsPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {isLoading} = useAppSelector(state => state.myCards);

    useEffect(() => {
        dispatch(readBusinessCards({}));
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div key={location.key}>
            <TopMenu />

            <CardList />

            <MyCardsBottomMenu />

            <ModalAddCard />

            <ModalDeleteCard />
            
            <ModalSettingsCard />

            <CopyLinkSnackbar />
        </div>
    );
};

export default MyCardsPage;