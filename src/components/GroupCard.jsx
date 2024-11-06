import { useNavigate } from "react-router-dom";


export default function GroupCard({ group }) {
  const navigate = useNavigate();

  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`/groups/${group.id}`);
  }
  return (
    <section className="page">
    <article className="group-card" onClick={handleClick}>
      <img src={group.image} alt={group.title} />
      <h2>{group.title}</h2>
      <p>{group.membersCount ? `${group.membersCount} Members` : "No members yet"}</p> {/* Display number of members */}
    </article>
    </section>
  );
}