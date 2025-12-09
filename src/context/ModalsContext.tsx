import { createContext, useState, type ReactNode } from "react";
import type { StateSetter } from "../types/types";

export interface IModalsContext {
    showAddItemBox: boolean;
    showCompareAndEditBox: boolean;
    showSettingsBox: boolean;

    setShowAddItemBox: StateSetter<boolean>;
    setShowCompareAndEditBox: StateSetter<boolean>;
    setShowSettingsBox: StateSetter<boolean>;

    hideModals: () => void;
}

interface ModalsContextProviderProps {
    children: ReactNode;
}

export const ModalsContext = createContext<IModalsContext>({
    showAddItemBox: false,
    showCompareAndEditBox: false,
    showSettingsBox: false,

    setShowAddItemBox: () => {},
    setShowCompareAndEditBox: () => {},
    setShowSettingsBox: () => {},

    hideModals: () => {}
});

export default function ModalsContextProvider({ children }: ModalsContextProviderProps) {
    const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);
    const [showCompareAndEditBox, setShowCompareAndEditBox] = useState<boolean>(false);
    const [showSettingsBox, setShowSettingsBox] = useState<boolean>(false);

    const hideModals = () => {
        setShowAddItemBox(false);
        setShowCompareAndEditBox(false);
        setShowSettingsBox(false);
    }
    
    const initialModalContext: IModalsContext = {
        showAddItemBox,
        showCompareAndEditBox,
        showSettingsBox,

        setShowAddItemBox,
        setShowCompareAndEditBox,
        setShowSettingsBox,

        hideModals
    };

    return (
        <ModalsContext value={initialModalContext}>
            {children}
        </ModalsContext>
    );
}
