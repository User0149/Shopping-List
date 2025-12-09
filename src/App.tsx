import ItemsContextProvider from "./context/ItemsContext";
import SearchContextProvider from "./context/SearchContext";
import UpdateItemContextProvider from "./context/UpdateItemContext";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddItemButton from "./components/AddItemButton";
import ItemsTable from "./components/ItemsTable/ItemsTable";
import AddItemBox from "./components/AddItemBox";
import CompareAndEditBox from "./components/CompareAndEditBox";
import ContentContainer from "./components/ContentContainer";

export default function App() {
    return (
        <ItemsContextProvider>
            <UpdateItemContextProvider>
                <SearchContextProvider>
                    <ContentContainer>
                        <div className="flex flex-col h-full space-y-5">
                            <Header />
                            <SearchBar />
                            <AddItemButton />

                            <div className="flex-1 overflow-auto no-scrollbar">
                                <ItemsTable />
                            </div>
                        </div>

                        <AddItemBox />
                        <CompareAndEditBox />
                    </ContentContainer>
                </SearchContextProvider>
            </UpdateItemContextProvider>
        </ItemsContextProvider>
    );
}
