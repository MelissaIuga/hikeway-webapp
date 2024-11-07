import Fox from '../images/fox.svg';
import Wolf from '../images/wolf.svg';
import Bear from '../images/bear.svg';
import Menu from '../images/menu.svg';
import Bell from '../images/bell.svg';
import { Link } from 'react-router-dom';


// no API handling on this page, therefore return styled elements
export default function Clubs() {
    return (
        <section className="page">

            <div id="topnav">
                <h1>Community</h1>
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


            <div>
                <h1>Welcome to Hikeway Clubs!</h1>
                <p>Find events, special challenges, and be part of a community of outdoor enthusiasts. You’re free to join whichever club you feel inclined to.</p>
            </div>

            <div>
                <h2>Join a club</h2>
                <div className='clubs'>
                    <div className="clubcontainer">
                        <img src={Fox} alt="Fox Club logo" />
                        <div className="clubtext">
                            <h1>Fox Club</h1>
                            <p>Beginner hikers</p>
                        </div>
                    </div>

                    <div className="clubcontainer">
                        <img src={Wolf} alt="Wolf Club logo" />
                        <div className="clubtext">
                            <h1>Wolf Club</h1>
                            <p>Intermediate hikers</p>
                        </div>
                    </div>


                    <Link to="/bear-club" className="clubcontainer">
                        <img src={Bear} alt="Bear Club logo" />
                        <div className="clubtext">
                            <h1>Bear Club</h1>
                            <p>Advanced hikers</p>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
