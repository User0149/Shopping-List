import type { ReactNode } from "react";

import SettingsContextProvider from "./SettingsContext";
import ModalsContextProvider from "./ModalsContext";
import ItemsContextProvider from "./ItemsContext";
import UpdateItemContextProvider from "./UpdateItemContext";
import SearchContextProvider from "./SearchContext";

interface ContextProvidersProps {
    children: ReactNode;
};

export default function ContextProviders({ children }: ContextProvidersProps) {
    return (
        <SettingsContextProvider>
            <ModalsContextProvider>
                <ItemsContextProvider>
                    <UpdateItemContextProvider>
                        <SearchContextProvider>
                            {children}
                        </SearchContextProvider>
                    </UpdateItemContextProvider>
                </ItemsContextProvider>
            </ModalsContextProvider>
        </SettingsContextProvider>
    );
}
