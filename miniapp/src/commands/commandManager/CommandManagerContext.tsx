import React, {createContext, useContext} from 'react';
import {CommandManager} from "./CommandManager";

const CommandManagerContext = createContext<CommandManager | null>(null);

export const useCommandManager = () => {
    const context = useContext(CommandManagerContext);

    if (!context) {
        throw new Error('useCommandManager must be used within CommandManagerProvider')
    }

    return context;
}

interface Props {
    children: React.ReactNode;
    manager: CommandManager;
}

export const CommandManagerProvider = ({children, manager}: Props) => {
    return (
        <CommandManagerContext.Provider value={manager}>
            {children}
        </CommandManagerContext.Provider>
    );
};