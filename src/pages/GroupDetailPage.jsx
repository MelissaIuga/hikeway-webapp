import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupCard from "./../components/GroupCard";
import PostCard from "./../components/PostCard";

export default function GroupDetailPage() {
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const url = `https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/groups/${params.id}.json`;
  const postsUrl = "https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

  useEffect(() => {
    async function getGroup() {
      const response = await fetch(url);
      const groupData = await response.json();
      groupData.id = params.id;
      setGroup(groupData);
    }

    async function fetchGroupPosts() {
      const response = await fetch(postsUrl);
      const data = await response.json();

      const groupPosts = Object.keys(data)
        .map(postId => ({ id: postId, ...data[postId] }))
        .filter(post => post.groupId === params.id);

      setPosts(groupPosts);
    }

    getGroup();
    fetchGroupPosts();
  }, [params.id, url, postsUrl]);

  function handleCreatePost() {
    navigate(`/create?groupId=${params.id}`);
  }

  return (
    <section className="page" id="group-page">
      <div className="container">
        <h1>{group.name}</h1>
        <GroupCard group={group} />

        <button onClick={handleCreatePost} className="btn-create-post">
          Create Post
        </button>

        <h2>Posts in {group.name}</h2>
        <div className="grid">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p>No posts found for this group.</p>
          )}
        </div>
      </div>
    </section>
  );
}
