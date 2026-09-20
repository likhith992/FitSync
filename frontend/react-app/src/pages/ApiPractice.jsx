import { useEffect, useState } from "react";

function ApiPractice() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function getUsers() {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();

            setUsers(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <h1>API Practice</h1>

            {error && <p>{error}</p>}

            {loading && <p>Loading users...</p>}

            {users.map((user) => (
                <p key={user.id}>
                    {user.name}
                </p>
            ))}
        </div>
    );
}

export default ApiPractice;