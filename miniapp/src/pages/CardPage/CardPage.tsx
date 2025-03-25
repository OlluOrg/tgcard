import React, {useEffect, useMemo} from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import '@mdxeditor/editor/style.css'
import './mdxstyle.scss';
import LinkModal from "../../components/LinkModal/LinkModal";
import TextModal from "../../components/TextModal/TextModal";
import VideoModal from "../../components/VideoModal/VideoModal";
import ChooseSectionModal from "../../components/ChooseSectionModal/ChooseSectionModal";
import CardPageBottomMenu from "../../components/CardPageBottomMenu/CardPageBottomMenu";
import SectionList from "../../components/SectionList/SectionList";
import {useParams} from "react-router-dom";
import {readOneBusinessCard} from "../../store/apiThunks/businessCardThunks";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getUserId} from "../../utils/getUserId";
import CardPageBottomMenuForGuest from "../../components/CardPageBottomMenuForGuest/CardPageBottomMenuForGuest";
import { useNavigate } from 'react-router-dom';
import {Spinner} from "@telegram-apps/telegram-ui";
import styles from '../../pages/CardPage/CardPage.module.scss';
import Loader from "../../components/Loader/Loader";
import {closeAllModals} from "../../store/slices/modalsCardPageSlice";
import {clearLinkSlice} from "../../store/slices/linkSlice";
import {clearTextSlice} from "../../store/slices/textSlice";
import {clearVideoSlice} from "../../store/slices/videoSlice";

const CardPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {cardId} = useParams();
    const {cards, isLoading} = useAppSelector(state => state.myCards);
    const userId: string = getUserId();

    useEffect(() => {
        dispatch(readOneBusinessCard({ businessCardId: cardId }));
    }, [cardId]);

    const currentCard = useMemo(() => {
        return cards.find(card => card.businessCardId === cardId)
    }, [cards, cardId])
    const userIdFromCard: string = currentCard?.userId ?? '';

    useEffect(() => {
        Telegram.WebApp.BackButton.show();

        Telegram.WebApp.BackButton.onClick(() => {
            dispatch(closeAllModals());
            dispatch(clearLinkSlice());
            dispatch(clearTextSlice());
            dispatch(clearVideoSlice())
            window.history.back();
        });

        return () => {
            Telegram.WebApp.BackButton.hide();
        };
    }, []);

    if (isLoading || !currentCard) {
        return <Loader />
    }

    return (
        <div>
            <SectionList isGuest={userId !== userIdFromCard} />

            {userId === userIdFromCard
                ? <CardPageBottomMenu />
                : <CardPageBottomMenuForGuest />
            }

            <LinkModal />

            <ChooseSectionModal />

            <TextModal />

            <VideoModal />
        </div>
    );
};

export default CardPage;