import { createContext, useState, type ReactNode } from "react";

export interface ISettingsContext {
    itemsCookie: string;
    setItemsCookieAndUpdateLocalStorage: (newItemsCookie: string) => void;
}

interface SettingsContextProviderProps {
    children: ReactNode;
}

export const SettingsContext = createContext<ISettingsContext>({
    itemsCookie: JSON.stringify([]),
    setItemsCookieAndUpdateLocalStorage: () => {}
});

export default function SettingsContextProvider({ children }: SettingsContextProviderProps) {
    if (localStorage.getItem("items") === null) {
        localStorage.setItem("items", JSON.stringify([]));
    }

    const [itemsCookie, setItemsCookie] = useState<string>(localStorage.getItem("items")!);

    const setItemsCookieAndUpdateLocalStorage = (newItemsCookie: string) => {
        localStorage.setItem("items", newItemsCookie);
        setItemsCookie(newItemsCookie);
    };

    const initialSettingsContext: ISettingsContext = {
        itemsCookie,
        setItemsCookieAndUpdateLocalStorage
    };

    return (
        <SettingsContext value={initialSettingsContext}>
            {children}
        </SettingsContext>
    );
}
