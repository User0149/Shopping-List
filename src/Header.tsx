function SearchBar() {
    return (
        <input id="search-bar" className="search_bar block m-auto text-xl p-3" placeholder="Search for an item"></input>
    );
}

function AddItemButton({setShowAddItemBox}) {
    return (
        <div className="mt-4 mb-4">
            <span className="text-blue-800 underline cursor-pointer" onClick={() => setShowAddItemBox(true)}>
                + Add item
            </span>
        </div>
    );
}

export default function Header({setShowAddItemBox}) {
    return (
        <>
            <SearchBar/>
            <AddItemButton setShowAddItemBox={setShowAddItemBox}/>
        </>
    );
}