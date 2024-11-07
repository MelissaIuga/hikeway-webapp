import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { auth } from "../firebase-config";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createPost(post) {
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }

    post.uid = auth.currentUser.uid;

    try {
      const response = await fetch(
        "https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error creating post", response.statusText);
      }
    } catch (error) {
      console.error("Error with fetch request:", error);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Create New Post</h1>
        <PostForm savePost={createPost} />
      </div>
    </section>
  );
}
