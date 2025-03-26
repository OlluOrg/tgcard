import React, {useMemo, useState} from 'react';
import {Tabbar} from "@telegram-apps/telegram-ui";
import Icon24Link from "../../icons/Icon24Link/Icon24Link";
import Icon24Edit from "../../icons/Icon24Edit/Icon24Edit";
import Icon24Bin from "../../icons/Icon24Bin/Icon24Bin";
import useCard from "../../hooks/MyCards/useCard";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getUserId} from "../../utils/getUserId";
import IconToVisit from "../../icons/IconToVisit/IconToVisit";
import {TCard} from "../../types/types";

const CardsHistoryBottomMenu = () => {
    const dispatch = useAppDispatch();
    const userId = getUserId();
    const { selectedCardId, viewHistory } = useAppSelector(state => state.myCards);

    const currentCard = useMemo(() => {
        return viewHistory.find(card => card.businessCardId === selectedCardId)
    }, [viewHistory, selectedCardId])
    const userIdFromCard: string = currentCard?.userId ?? '';


    const {handleCopyLink, handleEdit, handleDelete} = useCard();

    const [currentBottomTab, setCurrentBottomTab] = useState<string>('');

    const selectBottomTab = (idTab: string) => {
        const actions: Record<string, () => void> = {
            'copy': handleCopyLink,
            'edit': handleEdit,
            'delete': handleDelete,
            'pass': handleEdit
        };

        setCurrentBottomTab(idTab);
        actions[idTab]?.();
    };

    const allTabs = [
        { id: 'copy', text: 'Скопировать', Icon: Icon24Link },
        { id: 'edit', text: 'Изменить', Icon: Icon24Edit },
    ];

    const tabsToGuest = [
        { id: 'copy', text: 'Скопировать', Icon: Icon24Link },
        { id: 'pass', text: 'Перейти', Icon: IconToVisit },
    ];

    let filteredTabs = selectedCardId ? allTabs : [];
    if (currentCard && filteredTabs.length > 0 && userId !== userIdFromCard) {
        filteredTabs = tabsToGuest;
    }

    return (
        <Tabbar>
            {filteredTabs.map(({ id, Icon }) => (
                <Tabbar.Item
                    key={id}
                    selected={id === currentBottomTab}
                    onClick={() => selectBottomTab(id)}
                >
                    <Icon />
                </Tabbar.Item>
            ))}
        </Tabbar>
    );
};

export default CardsHistoryBottomMenu;