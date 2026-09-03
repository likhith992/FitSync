import { useEffect } from "react";

function useProfileLogger(name) {
    useEffect(() => {
        console.log("Name changed:", name);
    }, [name]);
}

export default useProfileLogger;