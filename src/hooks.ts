import { useRef, useEffect } from "react";


/**
 * Custom hook that allows for a function to trigger whenever a user clicks outside an element
 *
 * @param callBack the function to be called
 */
export function useOnClickAway(callBack: () => void) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            // if the HTML reference is valid and the mouse click is outside the div, close the dropdown menu
            if (ref.current && !ref.current.contains(event.target as Node)) callBack();
        }

        document.addEventListener("mousedown", handleClick);
        return () => { document.removeEventListener("mousedown", handleClick); }
    }, []);

    return ref;
}