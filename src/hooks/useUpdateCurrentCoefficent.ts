import { useEffect } from "react";

export function useUpdateCurrentCoefficent(currentCoefficent: number) {
    const lastCoefficent = currentCoefficent
    useEffect(() => {
        const interval = setInterval(() => {
            lastCoefficent+0.2
        }, 2000);
        return () => clearInterval(interval);
    }, [lastCoefficent]);

    return lastCoefficent
}