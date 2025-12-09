import { useContext } from "react";

import { UpdateItemContext } from "../context/UpdateItemContext";

export default function AddItemButton() {
    const { addItem } = useContext(UpdateItemContext);

    return (
        <div>
            <span className="text-blue-800 underline cursor-pointer" onClick={addItem}>
                + Add item
            </span>
        </div>
    );
}
