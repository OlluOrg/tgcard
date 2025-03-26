import React from 'react';
import {Tabbar} from "@telegram-apps/telegram-ui";
import Icon24Link from "../../icons/Icon24Link/Icon24Link";
import useCard from "../../hooks/MyCards/useCard";
import {generatePath, useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";
import IconBack from "../../icons/IconBack/IconBack";

const CardPageBottomMenuForGuest = () => {
    const {handleCopyLink} = useCard();
    const navigate = useNavigate();

    const handleMenuClick = (id: string) => {
        switch(id) {
            case 'back':
                navigate(generatePath(ROUTES.MY_CARDS));
                break;

            case 'link':
                handleCopyLink();
                break;
        }
    }
    const bottomTabs = [
        {id: 'back', text: 'Назад', Icon: IconBack,},
        {id: 'link', text: 'Ссылка', Icon: Icon24Link},
    ];

    return (
        <Tabbar style={{ zIndex: 1000}}>
            {bottomTabs.map(({id, text, Icon}) => (
                <Tabbar.Item
                    key={id}
                    onClick={() => handleMenuClick(id)}
                >
                    <Icon/>
                </Tabbar.Item>
            ))}
        </Tabbar>
    );
};

export default CardPageBottomMenuForGuest;