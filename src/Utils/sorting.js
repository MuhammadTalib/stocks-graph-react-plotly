export function descendingComparator(a, b, orderBy) {
  if (b?.[orderBy] < a?.[orderBy]) {
    return -1;
  }
  if (b?.[orderBy] > a?.[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy, selectedStrategy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, selectedStrategy)
    : (a, b) => -descendingComparator(a, b, orderBy, selectedStrategy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    console.log("a[0]", a[0]);
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
