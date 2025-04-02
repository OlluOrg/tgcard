import React, {useEffect, useMemo} from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import '@mdxeditor/editor/style.css'
import './mdxstyle.scss';
import LinkModal from "../../components/SectionComponents/BlockLink/LinkModal/LinkModal";
import TextModal from "../../components/SectionComponents/Text/TextModal/TextModal";
import VideoModal from "../../components/SectionComponents/Video/VideoModal/VideoModal";
import ChooseSectionModal from "../../components/SectionComponents/ChooseSectionModal/ChooseSectionModal";
import CardPageBottomMenu from "../../components/BottomMenu/CardPageBottomMenu/CardPageBottomMenu";
import SectionList from "../../components/SectionComponents/SectionList/SectionList";
import {useParams} from "react-router-dom";
import {readOneBusinessCard} from "../../store/apiThunks/businessCardThunks";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getUserId} from "../../utils/getUserId";
import CardPageBottomMenuForGuest from "../../components/BottomMenu/CardPageBottomMenuForGuest/CardPageBottomMenuForGuest";
import Loader from "../../components/Loader/Loader";
import {closeAllModals} from "../../store/slices/modalsCardPageSlice";
import {clearLinkSlice} from "../../store/slices/linkSlice";
import {clearTextSlice} from "../../store/slices/textSlice";
import {clearVideoSlice} from "../../store/slices/videoSlice";
import {selectSection} from "../../store/slices/myCardsSlice";
import {CARD_MODE} from "../../constants/cardMode";
import CardTitle from "../../components/SectionComponents/Title/CardTitle/CardTitle";
import TitleModal from "../../components/SectionComponents/Title/TitleModal/TitleModal";

const CardPage = () => {
    const dispatch = useAppDispatch();

    const {cardId, mode} = useParams();
    const {cards, isLoading} = useAppSelector(state => state.myCards);
    const userId: string = getUserId();

    useEffect(() => {
        dispatch(readOneBusinessCard({ businessCardId: cardId }));
    }, [cardId]);

    const currentCard = useMemo(() => {
        return cards.find(card => card.businessCardId === cardId)
    }, [cards, cardId])
    const userIdFromCard: string = currentCard?.userId ?? '';

    const isViewMode = useMemo(() => {
        if (userId !== userIdFromCard) return true;

        return mode === CARD_MODE.VIEW
    }, [userId, userIdFromCard, mode]);

    useEffect(() => {
        Telegram.WebApp.BackButton.show();

        Telegram.WebApp.BackButton.onClick(() => {
            dispatch(closeAllModals());
            dispatch(clearLinkSlice());
            dispatch(clearTextSlice());
            dispatch(clearVideoSlice());
            dispatch(selectSection({selectedSectionId: null}))
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
            <CardTitle isViewMode={isViewMode} title={currentCard?.title}/>

            <SectionList isViewMode={isViewMode} />

            {isViewMode
                ? <CardPageBottomMenuForGuest />
                : <CardPageBottomMenu />
            }

            <LinkModal />

            <TitleModal />

            <ChooseSectionModal />

            <TextModal />

            <VideoModal />
        </div>
    );
};

export default CardPage;