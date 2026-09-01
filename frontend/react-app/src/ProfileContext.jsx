import { createContext, useState } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState({
        name: "",
        age: "",
        height: "",
        weight: ""
    });

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}