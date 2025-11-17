import { useCallback, useState } from "react";

export function useLoading(initial: boolean = false) {
    const [loading, setLoading] = useState(initial);

    const on = useCallback(() => setLoading(true), []);
    const off = useCallback(() => setLoading(false), []);
    const toggle = useCallback(() => setLoading(prev => !prev), []);

    return { loading, on, off, toggle };
}
