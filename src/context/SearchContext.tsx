import { createContext, useState, type ReactNode } from "react";
import type { ISearchContext } from "../types/types";

export const SearchContext = createContext<ISearchContext>({
    searchQuery: "",
    setSearchQuery: () => {}
});

interface SearchContextProviderProps {
    children: ReactNode;
}

export default function SearchContextProvider({ children }: SearchContextProviderProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const initialSearchContext: ISearchContext = {
        searchQuery,
        setSearchQuery
    };

    return (
        <SearchContext value={initialSearchContext}>
            {children}
        </SearchContext>
    );
}