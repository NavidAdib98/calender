export function getFromLocalStorage<T>(key: string): T[] {
  const existingValue = localStorage.getItem(key);

  if (existingValue === null || existingValue === undefined) {
    return [];
  } else {
    const parsedValue = JSON.parse(existingValue);
    return parsedValue as T[];
  }
}

export function addToLocalStorage<T>(key: string, data: T) {
  const existingValue = localStorage.getItem(key);

  if (existingValue === null || existingValue === undefined) {
    const newArray = [data];
    localStorage.setItem(key, JSON.stringify(newArray));
  } else {
    const parsedValue = JSON.parse(existingValue) as T[];

    parsedValue.push(data);

    const updatedValue = JSON.stringify(parsedValue);

    localStorage.setItem(key, updatedValue);
  }
}
