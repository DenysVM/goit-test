export const fetchPaginatedData = async (apiFunc, setPage, setItems, page, itemsPerPage) => {
    const data = await apiFunc(page, itemsPerPage);
    setPage(page + 1);
    setItems(prevItems => [...prevItems, ...data]);
};