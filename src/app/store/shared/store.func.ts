export function addOrUpdate<T extends { id: string }>(array: T[], item: T) {
  if (array.findIndex((i) => i.id == item.id) >= 0) {
    return array.map((i) => (i.id == item.id ? item : i));
  } else return [...array, item];
}
