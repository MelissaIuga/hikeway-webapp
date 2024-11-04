import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import homeIcon from '../images/home-default.svg';
import homeActiveIcon from '../images/home-active.svg';
import mapIcon from '../images/map-default.svg';
import mapActiveIcon from '../images/map-active.svg';
import communityIcon from '../images/community-default.svg';
import communityActiveIcon from '../images/community-active.svg';
import navigationIcon from '../images/navigation.svg'; 
import profileNavIcon from '../images/profile-nav.svg'; 

export default function Nav() {
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [isCommunityActive, setIsCommunityActive] = useState(false);
  const location = useLocation();

  // Function to reset all active states
  const resetActiveStates = () => {
    setIsHomeActive(false);
    setIsMapActive(false);
    setIsCommunityActive(false);
  };

  const handleHomeClick = () => {
    resetActiveStates();
    setIsHomeActive(true);
  };

  const handleMapClick = () => {
    resetActiveStates();
    setIsMapActive(true);
  };

  const handleCommunityClick = () => {
    resetActiveStates();
    setIsCommunityActive(true);
  };

  // Reset state when the route changes
  useEffect(() => {
    resetActiveStates(); // Reset all active states on route change

    if (location.pathname === '/') {
      setIsHomeActive(true);
    } else if (location.pathname === '/map') {
      setIsMapActive(true);
    } else if (location.pathname === '/community') {
      setIsCommunityActive(true);
    }
  }, [location]);

  return (
    <nav>
      <NavLink to="/" onClick={handleHomeClick}>
        <img
          src={isHomeActive ? homeActiveIcon : homeIcon}
          alt="Home"
        />
      </NavLink>
      <NavLink to="/map" onClick={handleMapClick}>
        <img
          src={isMapActive ? mapActiveIcon : mapIcon}
          alt="Map"
        />
      </NavLink>
      <NavLink to="/navigation">
        <img 
          src={navigationIcon} // Display static navigation.svg
          alt="Navigation"
        />
      </NavLink>
      <NavLink to="/community" onClick={handleCommunityClick}>
        <img
          src={isCommunityActive ? communityActiveIcon : communityIcon}
          alt="Community"
        />
      </NavLink>
      <NavLink to="/profile">
        <img 
          src={profileNavIcon} // Display static profile-nav.svg
          alt="Profile"
        />
      </NavLink>
      {/* <NavLink to="/create">Create Post</NavLink> */}
    </nav>
  );
}
