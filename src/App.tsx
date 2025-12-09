import ItemsContextProvider from "./context/ItemsContext";
import SearchContextProvider from "./context/SearchContext";
import UpdateItemContextProvider from "./context/UpdateItemContext";

import ContentContainer from "./components/ContentContainer";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddItemButton from "./components/AddItemButton";
import ItemsTable from "./components/ItemsTable/ItemsTable";
import AddItemBox from "./components/AddItemBox";
import CompareAndEditBox from "./components/CompareAndEditBox";
import SettingsBox from "./components/SettingsBox";
import ContextProviders from "./context/ContextProviders";

export default function App() {
    return (
        <ContextProviders>
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
                <SettingsBox />
            </ContentContainer>
        </ContextProviders>
    );
}
