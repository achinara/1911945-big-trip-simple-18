const sortByDate = (a, b) => new Date(a.dateFrom || 0) - new Date(b.dateFrom || 0);
const sortByPrice = (a, b) => (b.basePrice || 0) - (a.basePrice || 0);

export {sortByDate, sortByPrice};
