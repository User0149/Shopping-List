import { useContext, type ReactNode } from "react";
import { UpdateItemContext } from "../context/UpdateItemContext";

interface ModalBoxProps {
    children: ReactNode;
}

export default function ModalBox({ children }: ModalBoxProps) {
    const { hideModals } = useContext(UpdateItemContext);
    return (
        <div className="modal-background" onClick={() => {
            hideModals();
        }}>
            <div className="modal-box" onClick={(e) => {
                e.stopPropagation();
            }}>
                <span className="modal-close-button" onClick={() => hideModals()}>&times;</span>
                {children}
            </div>
        </div>
    );
}