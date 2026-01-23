import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ChatContextType
{
    isChatOpen: boolean;
    openChat: () => void;
    closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>( undefined );

export const useChat = (): ChatContextType =>
{
    const context = useContext( ChatContext );
    if ( !context )
    {
        throw new Error( 'useChat must be used within ChatProvider' );
    }
    return context;
};

interface ChatProviderProps
{
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ( { children } ) =>
{
    const [ isChatOpen, setIsChatOpen ] = useState( false );

    const openChat = () => setIsChatOpen( true );
    const closeChat = () => setIsChatOpen( false );

    return (
        <ChatContext.Provider value={{ isChatOpen, openChat, closeChat }}>
            {children}
        </ChatContext.Provider>
    );
};
