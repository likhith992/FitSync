import { createContext, useState } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {

    const [name, setName] = useState("");

    const [profile, setProfile] = useState({
        age: "",
        height: "",
        weight: ""
    });

    return (
        <ProfileContext.Provider
            value={{
                name,
                setName,
                profile,
                setProfile
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}