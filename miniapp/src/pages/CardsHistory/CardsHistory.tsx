import React, {useEffect} from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import TopMenu from "../../components/TopMenu/TopMenu";
import ModalDeleteCard from "../../components/CardComponents/ModalDeleteCard/ModalDeleteCard";
import CardsHistoryList from '../../components/CardsHistoryList/CardsHistoryList';
import CardsHistoryBottomMenu from '../../components/BottomMenu/CardsHistoryBottomMenu/CardsHistoryBottomMenu';
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