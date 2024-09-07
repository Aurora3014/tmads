import React, { createContext, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface CookieContextType {
    auth: string | undefined;
}

export const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
    children: ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
    console.log(Cookies.get('user') ? Cookies.get('user')! : '{}')
    const auth = Cookies.get('user') ? JSON.parse(JSON.isRawJSON(Cookies.get('user')) ? Cookies.get('user')! : '{}') : false;
    const value: CookieContextType = {
        auth
    };

    return (
        <CookieContext.Provider value={value}>
            {children}
        </CookieContext.Provider>
    );
};

export const useCookies = (): CookieContextType => {
    const context = useContext(CookieContext);
    if (context === undefined) {
        throw new Error('useCookies must be used within a CookieProvider');
    }
    return context;
};