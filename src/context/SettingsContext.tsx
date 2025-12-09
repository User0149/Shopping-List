import { createContext, type ReactNode } from "react";

export interface ISettingsContext {
}

interface SettingsContextProviderProps {
    children: ReactNode;
}

export const SettingsContext = createContext<ISettingsContext>({
});

export default function SettingsContextProvider({ children }: SettingsContextProviderProps) {
    const initialSettingsContext: ISettingsContext = {
    };

    return (
        <SettingsContext value={initialSettingsContext}>
            {children}
        </SettingsContext>
    );
}
