import React, {useEffect, useState} from 'react';
import {TabsItem} from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";
import {TabsList} from "@telegram-apps/telegram-ui";
import {ROUTES} from "../../routes";
import {useLocation, useNavigate} from "react-router-dom";

const TopMenu = () => {
    const [currentTopTab, setCurrentTopTab] = useState<string>('myCard');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentTab = location.pathname === ROUTES.HISTORY ? 'history' : 'myCard';
        setCurrentTopTab(currentTab);
    }, [location]);

    const selectTopTab = (idTab: string) => {
        const route = idTab === 'myCard' ? ROUTES.MY_CARDS : ROUTES.HISTORY;
        setCurrentTopTab(idTab);
        navigate(route);
    };

    const topTabs = [
        { id: 'myCard', text: 'Мои визитки' },
        { id: 'history', text: 'История' },
    ];

    return (
        <TabsList>
            {topTabs.map(({id, text}) => (
                <TabsItem
                    key={id}
                    onClick={() => selectTopTab(id)}
                    selected={id === currentTopTab}
                >
                    {text}
                </TabsItem>
            ))}
        </TabsList>
    );
};

export default TopMenu;