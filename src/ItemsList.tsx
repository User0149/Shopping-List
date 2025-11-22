export default function ItemsList({items}: {items: string | null}) {
    return (
        <>
            <table className="w-[calc(100%-8*var(--spacing))]">
                <thead>
                    <tr className="border-b border-black">
                        <th className="w-[30px]"></th>
                        <th className="w-[calc(0.8*(100%-280px))]">Item</th>
                        <th className="w-[150px]">Value</th>
                        <th className="w-[calc(0.2*(100%-280px))]">Store</th>
                        <th className="w-[100px]">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items !== null && JSON.parse(items).map((item: {
                            selected: boolean, itemName: string, store: string, 
                            unit: string, 
                            prefixOffered: string, priceOffered: number, quantityOffered: number,  prefixCompared: string, priceCompared: number, quantityCompared: number
                        }) => {
                            <tr>
                                <td>{item.itemName}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {(items === null || JSON.parse(items).length === 0) && <div className="text-center mt-2">No items found</div>}
        </>
    );
}