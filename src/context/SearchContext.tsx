import { createContext, useState, type ReactNode } from "react";
import type { StateSetter } from "../types/types";

interface ISearchContext {
    searchQuery: string;
    setSearchQuery: StateSetter<string>;
}

interface SearchContextProviderProps {
    children: ReactNode;
}

export const SearchContext = createContext<ISearchContext>({
    searchQuery: "",
    setSearchQuery: () => {}
});

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
