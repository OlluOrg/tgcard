import React, {useState} from 'react';
import {Tabbar} from "@telegram-apps/telegram-ui";
import Icon24Check from "../../icons/Icon24Check/Icon24Check";
import Icon24Edit from "../../icons/Icon24Edit/Icon24Edit";
import Icon24Bin from "../../icons/Icon24Bin/Icon24Bin";
import Icon24CircleAdd from "../../icons/Icon24CircleAdd/Icon24CircleAdd";
import {setIsModalChooseSectionOpen} from "../../store/slices/modalsCardPageSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCardSections from "../../hooks/CardPage/useCardSections";

const CardPageBottomMenu = () => {
    const dispatch = useAppDispatch();
    const {selectedSectionId} = useAppSelector(state => state.myCards);

    const {handleDone, handleEdit, handleDelete} = useCardSections();
    const [currentBottomTab, setCurrentBottomTab] = useState<string>('');

    const selectBottomTab = (idTab: string) => {
        setCurrentBottomTab(idTab);
        if (idTab === 'done'){
            handleDone();
        }
        if (idTab === 'edit'){
            handleEdit();
        }
        if (idTab === 'delete'){
            handleDelete();
        }
        if (idTab === 'create'){
            dispatch(setIsModalChooseSectionOpen(true));
        }
        if (idTab === 'settings'){
            dispatch(setIsModalChooseSectionOpen(true));
        }
    }

    const bottomTabs = [
        {id: 'done', text: 'готово', Icon: Icon24Check,},
        {id: 'edit', text: 'Изменить', Icon: Icon24Edit,},
        {id: 'delete', text: 'Удалить', Icon: Icon24Bin,},
        {id: 'create', text: 'Создать', Icon: Icon24CircleAdd,},
    ];

    const filteredTabs = selectedSectionId
        ? bottomTabs // Show all tabs if a section is selected
        : bottomTabs.filter(tab => tab.id === 'done' || tab.id === 'create'); 
    
    return (
        <Tabbar>
            {filteredTabs.map(({id, text, Icon}) => (
                <Tabbar.Item
                    key={id}
                    selected={id === currentBottomTab}
                    onClick={() => selectBottomTab(id)}
                >
                    <Icon/>
                </Tabbar.Item>
            ))}
        </Tabbar>
    );
};

export default CardPageBottomMenu;