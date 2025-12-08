import { useContext, type ReactNode } from "react";
import { UpdateItemContext } from "../context/UpdateItemContext";

interface ModalBoxProps {
    children: ReactNode;
}

export default function ModalBox({ children }: ModalBoxProps) {
    const { hideModals } = useContext(UpdateItemContext);
    return (
        <div className="fixed left-0 top-0 h-full w-full z-1000 bg-black/75" onClick={hideModals}>
            <div className="mx-auto mt-8 p-4 w-3/4 z-1001 bg-white" onClick={(e) => {
                e.stopPropagation();
            }}>
                <span className="float-right cursor-pointer text-4xl text-[lightgray] hover:text-[gray]" onClick={hideModals}>&times;</span>
                {children}
            </div>
        </div>
    );
}
