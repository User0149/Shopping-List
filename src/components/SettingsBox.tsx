import { useContext } from "react";

import { ModalsContext } from "../context/ModalsContext";

import ModalBox from "./ModalBox";
import SpaceY from "./SpaceY";

export default function SettingsBox() {
    const { showSettingsBox } = useContext(ModalsContext);

    if (!showSettingsBox) return <></>;

    return (
        <ModalBox>
            <SpaceY spacing={4}>
                <h2 className="text-center font-bold text-2xl">Settings</h2>
            </SpaceY>
        </ModalBox>
    );
}
