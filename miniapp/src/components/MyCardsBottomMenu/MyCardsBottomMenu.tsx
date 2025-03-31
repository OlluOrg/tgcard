import React, {useState} from 'react';
import {Tabbar} from "@telegram-apps/telegram-ui";
import Icon24Link from "../../icons/Icon24Link/Icon24Link";
import Icon24Edit from "../../icons/Icon24Edit/Icon24Edit";
import Icon24Bin from "../../icons/Icon24Bin/Icon24Bin";
import Icon24CircleAdd from "../../icons/Icon24CircleAdd/Icon24CircleAdd";
import {setIsModalAddOpen, setIsModalSettingsOpen} from "../../store/slices/modalsMyCardsSlice";
import useCard from "../../hooks/MyCards/useCard";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Icon24Settings from "../../icons/Icon24Settings/Icon24Settings";

const MyCardsBottomMenu = () => {
    const dispatch = useAppDispatch();

    const { selectedCardId } = useAppSelector(state => state.myCards);
    const {handleCopyLink, handleEdit, handleDelete} = useCard();

    const [currentBottomTab, setCurrentBottomTab] = useState<string>('');

    const selectBottomTab = (idTab: string) => {
        const actions: Record<string, () => void> = {
            'copy': () => handleCopyLink(selectedCardId!),
            'edit': () => handleEdit(selectedCardId!),
            'delete': handleDelete,
            'create': () => dispatch(setIsModalAddOpen(true)),
            'settings': () => dispatch(setIsModalSettingsOpen(true)),
        };

        setCurrentBottomTab(idTab);
        actions[idTab]?.();
    };

    const bottomTabs = [
        { id: 'copy', text: 'Скопировать', Icon: Icon24Link },
        { id: 'edit', text: 'Изменить', Icon: Icon24Edit },
        { id: 'delete', text: 'Удалить', Icon: Icon24Bin },
        { id: 'create', text: 'Создать', Icon: Icon24CircleAdd },
        { id: 'settings', text: 'Настройки', Icon: Icon24Settings },
    ];

    const noCardTabs = [
         { id: 'create', text: 'Создать', Icon: Icon24CircleAdd },
     ];
 
     const filteredTabs = selectedCardId ? bottomTabs : noCardTabs;

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

export default MyCardsBottomMenu;