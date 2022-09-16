import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logotop from "../../pages/logo banner/logo0.png"
import {  useEffect, useState } from "react";
import axios from "axios";


export default function Topbar() {
  const [user, setUser] = useState({});
  const {profilePicture} =useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${user.profilePicture}`);
      setUser(res.data);
    };
    fetchUser();
  }, [profilePicture]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" > 
          <img className="logotop" src={logotop} alt="logotop"/>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend"
            className="searchInput"
          />
        </div>
      </div>
     
      </div>
   
  );
}
