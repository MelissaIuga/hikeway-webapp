import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";

export default function PostForm({ savePost, post }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCaptionError, setIsCaptionError] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isLocationError, setIsLocationError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (post) {
      setCaption(post.caption || "");
      setImage(post.image || "");
      setLocation(post.location || "");
      setDescription(post.description || "");
    }
  }, [post]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!caption || !image || !location || !description) {
      setErrorMessage("Please fill out all fields.");
      setIsCaptionError(!caption);
      setIsImageError(!image);
      setIsLocationError(!location);
      setIsDescriptionError(!description);
      return;
    }

    setErrorMessage("");
    setIsCaptionError(false);
    setIsImageError(false);
    setIsLocationError(false);
    setIsDescriptionError(false);

    const formData = { caption, image, location, description };
    savePost(formData);
  }

  // image upload and handling
  async function handleImageChange(event) {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file.size < 500000) {
      const imageUrl = await uploadImage(file);
      setImage(imageUrl);
      setErrorMessage("");
      setIsImageError(false);
    } else {
      setErrorMessage("The image file is too big!");
      setIsImageError(true);
    }
    setTimeout(() => setIsLoading(false), 500);
  }

  async function uploadImage(imageFile) {
    const firebaseProjectId = "hikeway-webapp";
    const url = `https://firebasestorage.googleapis.com/v0/b/${firebaseProjectId}.appspot.com/o/${imageFile.name}`;
    const response = await fetch(url, {
      method: "POST",
      body: imageFile,
      headers: { "Content-Type": imageFile.type },
    });

    if (!response.ok) {
      setErrorMessage("Upload image failed");
      setIsImageError(true);
      throw new Error("Upload image failed");
    }

    return `${url}?alt=media`;
  }

  // return the form users must fill in
  return (
    <>
      <form className="form-grid" onSubmit={handleSubmit}>
      <div className="inputgroup">
        <label htmlFor="caption">Give it a nice title</label>
        <input
          id="caption"
          name="caption"
          type="text"
          value={caption}
          placeholder="My hike to..."
          onChange={(e) => setCaption(e.target.value)}
          className={isCaptionError ? "error" : ""}
        />
        </div>

        <div className="inputgroup">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          value={location}
          placeholder="Where was this?"
          onChange={(e) => setLocation(e.target.value)}
          className={isLocationError ? "error" : ""}
        />
        </div>

        <div className="inputgroup">
        <label htmlFor="description">Tell us about your hike</label>
        <textarea
          id="description"
          name="description"
          value={description}
          placeholder="Any tips to share or cool things you have seen along the way?"
          onChange={(e) => setDescription(e.target.value)}
          className={isDescriptionError ? "error" : ""}
        />
        </div>

        <div className="inputgroup">
        <label htmlFor="image-url">Took any photos?</label>
        <input
          type="file"
          className="hide"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
    
        <img
          id="image"
          className={isImageError ? "error image-preview" : "image-preview"}
          src={
            image
              ? image
              : "https://placehold.co/600x400?text=Click+here+to+select+an+image"
          }
          alt="Choose"
          onError={(e) =>
            (e.target.src =
              "https://placehold.co/600x400?text=Error+loading+image")
          }
          onClick={() => fileInputRef.current.click()}
        />
         </div>

        <div className="error-message">
          <p>{errorMessage}</p>
        </div>

        <div className="btns">
          <button>{post ? "Update Post" : "Create Post"}</button>
        </div>
      </form>
      <Loader show={isLoading} />
    </>
  );
}
