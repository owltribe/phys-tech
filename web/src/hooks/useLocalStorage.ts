'use client'

import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>( key: string, initialValue: T ): [T, Dispatch<SetStateAction<T>>] {
    const storedValue = global?.localStorage?.getItem(key);
    const initial = storedValue ? (storedValue as T) : initialValue;
    const [value, setValue] = useState<T>(initial);

    useEffect(() => {
        global?.localStorage?.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

