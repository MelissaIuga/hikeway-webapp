import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
  const [post, setPost] = useState({});
  const params = useParams();
  const url = `https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.id}.json`;
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      setPost(postData);
    }

    getPost();
  }, [url]);

  // function handling the post update 
  async function updatePost(postToUpdate) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(postToUpdate)
    });

    if (response.ok) {
      navigate(`/posts/${params.id}`);
    } else {
      console.log("Error updating post data");
    }
  }

  // return updated post
  return (
    <section className="page" id="update-page">
      <div className="container">
        <h1>Update post</h1>
        <PostForm savePost={updatePost} post={post} />
      </div>
    </section>
  );
}