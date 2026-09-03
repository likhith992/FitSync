import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

function useProfile() {
    const { profile, dispatch } = useContext(ProfileContext);

    function setName(value) {
        dispatch({
            type: "setName",
            value: value
        });
    }

    function setAge(value) {
        dispatch({
            type: "setAge",
            value: value
        });
    }

    function setHeight(value) {
        dispatch({
            type: "setHeight",
            value: value
        });
    }

    function setWeight(value) {
        dispatch({
            type: "setWeight",
            value: value
        });
    }

    return {
        profile,
        setName,
        setAge,
        setHeight,
        setWeight
    };
}

export default useProfile;