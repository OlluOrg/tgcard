import React, {useState} from 'react';
import {Tabbar} from "@telegram-apps/telegram-ui";
import Icon24Link from "../../icons/Icon24Link/Icon24Link";
import Icon24Edit from "../../icons/Icon24Edit/Icon24Edit";
import Icon24Bin from "../../icons/Icon24Bin/Icon24Bin";
import useCard from "../../hooks/MyCards/useCard";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const CardsHistoryBottomMenu = () => {
    const dispatch = useAppDispatch();
    const { selectedCardId } = useAppSelector(state => state.myCards);

    const {handleCopyLink, handleEdit, handleDelete} = useCard();

    const [currentBottomTab, setCurrentBottomTab] = useState<string>('');

    const selectBottomTab = (idTab: string) => {
        const actions: Record<string, () => void> = {
            'copy': handleCopyLink,
            'edit': handleEdit,
            'delete': handleDelete,
        };

        setCurrentBottomTab(idTab);
        actions[idTab]?.();
    };

    const allTabs = [
        { id: 'copy', text: 'Скопировать', Icon: Icon24Link },
        { id: 'edit', text: 'Изменить', Icon: Icon24Edit },
        { id: 'delete', text: 'Удалить', Icon: Icon24Bin },
    ];

    const filteredTabs = selectedCardId ? allTabs : [];
    

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