import Bear from '../images/bear.svg';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GroupCard from "../components/GroupCard";

export default function BearClubPage() {
    const [groups, setGroups] = useState([]); // State for groups
    const [user, setUser] = useState(null); // State for Firebase user
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch user data from Firebase
                const userUrl = `https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}.json`;
                const response = await fetch(userUrl);
                const userData = await response.json();

                setUser({
                    name: userData.name || currentUser.displayName || "User", // Use fetched name or fallback to displayName
                    email: currentUser.email,
                    uid: currentUser.uid,
                });
            } else {
                setUser(null); // User is signed out
            }
        });

        return () => unsubscribe(); // Clean up the listener on component unmount
    }, [auth]);

    useEffect(() => {
        async function fetchGroups() {
            const response = await fetch(
                "https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/groups.json"
            );
            const data = await response.json();
            const groupsArray = Object.keys(data).map(groupId => ({
                id: groupId,
                ...data[groupId]
            }));
            setGroups(groupsArray);
        }

        fetchGroups();
    }, []);


    return (
        <section className='page'>
            <div className='welcomebear'>
                <img id="largeclublogo" src={Bear} alt="Bear Club logo" />

                <div className='bearclubtext'>
                    <h1>Bear Club</h1>
                    <p>Advanced hikers</p>
                </div>
            </div>

            <div className='groups'>
                <h2>Nearby Groups to Join</h2>

                <div className="groupgrid">
                    {groups.map(group => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
                
            </div>
        </section>
    );
}