import { createContext, useReducer } from "react";

export const ProfileContext = createContext();

const initialProfileState = {
    name: "",
    age: "",
    height: "",
    weight: ""
};

function profileReducer(state, action) {
    switch (action.type) {

        case "setName":
            return {
                ...state,
                name: action.value
            };

        case "setAge":
            return {
                ...state,
                age: action.value
            };

        case "setHeight":
            return {
                ...state,
                height: action.value
            };

        case "setWeight":
            return {
                ...state,
                weight: action.value
            };

        default:
            return state;
    }
}

export function ProfileProvider({ children }) {

    const [profile, dispatch] = useReducer(
        profileReducer,
        initialProfileState
    );

    return (
        <ProfileContext.Provider
            value={{
                profile,
                dispatch
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}