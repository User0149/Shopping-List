import { useContext } from "react";

import { ModalsContext } from "../context/ModalsContext";

export default function Header() {
    const { setShowSettingsBox } = useContext(ModalsContext);

    return (
        <div className="relative">
            <h1 className="text-center font-bold text-4xl">Shopping List</h1>
            <img src="settings.svg" alt="settings" width="16" className="absolute right-4 top-0 flex items-center justify-center cursor-pointer" onClick={() => setShowSettingsBox(true)} />
        </div>
    );
}
