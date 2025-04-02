import React, {useEffect} from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import TopMenu from "../../components/TopMenu/TopMenu";
import ModalAddCard from "../../components/CardComponents/ModalAddCard/ModalAddCard";
import ModalDeleteCard from "../../components/CardComponents/ModalDeleteCard/ModalDeleteCard";
import CardList from "../../components/CardComponents/CardList/CardList";
import MyCardsBottomMenu from "../../components/BottomMenu/MyCardsBottomMenu/MyCardsBottomMenu";
import ModalSettingsCard from "../../components/CardComponents/ModalSettingsCard/ModalSettingsCard";
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