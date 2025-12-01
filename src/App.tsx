import "./App.css";

import ItemsContextProvider from "./context/ItemsContext";
import SearchContextProvider from "./context/SearchContext";
import UpdateItemContextProvider from "./context/UpdateItemContext";

import Header from "./components/Header";
import ItemsTable from "./components/ItemsTable/ItemsTable";
import AddItemBox from "./components/AddItemBox";
import SpaceY from "./components/SpaceY";
import CompareAndEditBox from "./components/CompareAndEdit";

export default function App() {
    return (
        <ItemsContextProvider>
            <UpdateItemContextProvider>
                <SearchContextProvider>
                    <SpaceY spacing={5}>
                        <h1>Shopping List</h1>
                        <Header />
                        <ItemsTable />
                    
                        <AddItemBox />
                        <CompareAndEditBox />
                    </SpaceY>
            </SearchContextProvider>
            </UpdateItemContextProvider>
        </ItemsContextProvider>
    );
}
