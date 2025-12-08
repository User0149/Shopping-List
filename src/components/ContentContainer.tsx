import type { ReactNode } from "react";

interface ContentContainerProps {
    children: ReactNode;
}
export default function ContentContainer({ children }: ContentContainerProps) {
    return (
        <div className="px-6 py-4 h-full">
            {children}
        </div>
    );
}
