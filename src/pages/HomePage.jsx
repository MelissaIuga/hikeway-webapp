import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth import
import PostCard from "../components/PostCard";
import Menu from '../images/menu.svg';
import Bell from '../images/bell.svg';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // State for Firebase user
  const auth = getAuth();

  // Listen for the authenticated user
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

    return () => unsubscribe(); 
  }, [auth]);

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        "https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      );
      const data = await response.json();
      const postsArray = Object.keys(data).map(postId => ({
        id: postId,
        ...data[postId]
      }));
      setPosts(postsArray);
    }

    fetchPosts();
  }, []);

  // return styled elements and user posts
  return (
    <section className="page">
      <div id="topnav">
      <h1>Hey, {user ? user.name : "User"}!</h1>
      <div id="topnav-inner"><img
          src={Bell}
          alt="Notifications"
        />
        <img
          src={Menu}
          alt="Menu"
        />
      </div>
      </div>

      {/* <div className="challenge">
      <h1>Suggested Challenges</h1>
      <p>Join a challenge, hike & earn rewards!</p>
   </div> */}

     <h1>
      Posts from hikers in <span style={{ color: 'var(--pine-400)' }}>Silkeborg</span>
    </h1>

      <div className="grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
