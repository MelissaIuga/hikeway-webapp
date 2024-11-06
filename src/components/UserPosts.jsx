import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function UserPosts({ uid }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const url = `https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy="uid"&equalTo="${uid}"`;
      const response = await fetch(url);
      const data = await response.json();
      const postsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setPosts(postsArray);
    }
    if (uid) {
      getPosts();
    }
  }, [uid]);
  return (
    <section className="grid">
      {posts.length ? (
        posts.map(post => <PostCard post={post} key={post.id} />)
      ) : (
        <p>No posts yet</p>
      )}
    </section>
  );
}
