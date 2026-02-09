import { useContext } from "react";

import { SearchContext } from "../context/SearchContext";

export default function SearchBar() {
    const { setSearchQuery } = useContext(SearchContext);

    return (
        <div>
            <input name="search-bar" className="w-9/10 rounded-full border block m-auto text-base sm:text-xl p-3" placeholder="Search for an item" onInput={(e) => {
                setSearchQuery((e.target as HTMLInputElement).value);
            }}></input>
        </div>
    );
}
