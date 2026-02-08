import { useContext, useEffect, useState } from "react";

import { ModalsContext } from "../context/ModalsContext";
import { SettingsContext } from "../context/SettingsContext";

import ModalBox from "./ModalBox";
import SpaceY from "./SpaceY";

function ItemsJSONSetting() {
    const { itemsCookie, setItemsCookieAndUpdateLocalStorage } = useContext(SettingsContext);

    const [itemsCookieFieldValue, setItemsCookieFieldValue] = useState(itemsCookie);
    
    useEffect(() => {
        setItemsCookieFieldValue(itemsCookie);
    }, [itemsCookie]);

    return (
        <SpaceY spacing={1}>
            <div>
                <div className="font-bold">Shopping list as JSON string</div>
                <div className="text-red-500 text-sm">Don't change this unless you know what you're doing.</div>
                <div className="text-red-500 text-sm">Recover data from localStorage if lost.</div>
            </div>
            <textarea className="text-xs w-full p-1 rounded border" value={itemsCookieFieldValue} onChange={
                (e) => {
                    setItemsCookieFieldValue(e.target.value);
            }}></textarea>

            <button className="border rounded p-2 cursor-pointer bg-red-400 hover:bg-red-600" onClick={() => {
                setItemsCookieAndUpdateLocalStorage(itemsCookieFieldValue);
            }}>Update JSON string</button>
        </SpaceY>
    );
}


export default function SettingsBox() {
    const { showSettingsBox } = useContext(ModalsContext);

    if (!showSettingsBox) return <></>;

    return (
        <ModalBox>
            <SpaceY spacing={4}>
                <h2 className="text-center font-bold text-2xl">Settings</h2>

                <ItemsJSONSetting />
            </SpaceY>
        </ModalBox>
    );
}
