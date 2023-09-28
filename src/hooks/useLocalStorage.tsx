import { useState, useEffect } from "react";

// Utils
import { getFromLocalStorage } from "../utils/localStorageFunctions";

function useLocalStorage<T>(key: string) {
  const [data, setData] = useState<T[]>([]);

  // mount
  useEffect(() => {
    let data_storage: T[] = getFromLocalStorage(key);
    setData(data_storage);
  }, [key]);

  return [data, setData] as const;
}

export default useLocalStorage;
