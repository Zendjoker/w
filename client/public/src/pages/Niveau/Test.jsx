import "../../components/topbar/topbar.css"
import "./test.css"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Person, Chat, Notifications } from "@material-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome ,faUserCircle,faSignOutAlt ,faCog ,faComments ,faSearch,faStore,faBell} from '@fortawesome/free-solid-svg-icons'

import 'font-awesome/css/font-awesome.min.css';

export default function Test() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    
  return (
    <>
    <div className="allSectionTest">
    <div className="vertical_wrap">    
      <div className="backdrop" />
      <div className="vertical_bar">
      <div className="topbarIcons">
          <div className="topbarIcon">
            <Person />
            <span className="notifications">+99</span>
          </div>
          <div className="topbarIcon">
            <Chat />
            <span className="notifications">+6</span>
          </div>
          <div className="topbarIcon">
            <Notifications />
            <span className="notifications">+8</span>
          </div>
        </div>
        <div className="profile_info">
          <div className="img_holder">
          <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="profileUserImg"
          />
        </Link>
        
          </div>
          <p className="title">{user.username}</p>
          <p className="sub_title">From : Tunis{user.desc}</p>
        </div>
        <div className="Uld">
         <ul className="follfull">
           <li>
            <span className="underName"><h3>54</h3>Posts</span>
           </li>
           <li>
            <span className="underName"><h3>1.2k</h3>Followers</span>
           </li>
           <li>
            <span className="underName"><h3>14</h3>Following</span>
           </li>
         </ul>
        </div>
        <ul className="menu">
          <li >
          <Link to ='/'>
          <FontAwesomeIcon icon={faHome} className="iconLeftbar" />
              <span className="text">Home</span>
              </Link>
          </li>
         
          <li>
            
          <Link to={`/profile/${user.username}`}>
          <FontAwesomeIcon icon={faUserCircle} className="iconLeftbar"
           />
              <span className="text">Profile</span>    
              </Link>
            
          </li>
          <li>
            <Link to="">
            <FontAwesomeIcon icon={faBell} className="iconLeftbar" />
              <span className="text">Notifications</span>
              </Link>
          </li>
          <li>
            
            <Link to="/messenger" >
            <FontAwesomeIcon icon={faComments} className="iconLeftbar" />
                <span className="text">Messages</span>    
                </Link>
              
            </li>
            <li>
            
            <Link >
            <FontAwesomeIcon icon={faSearch} className="iconLeftbar" />
                <span className="text">Explore</span>    
                </Link>
              
            </li>
          <li>
          <Link to="">
            <FontAwesomeIcon icon={faStore} className="iconLeftbar" />
              <span className="text">Market Place</span>
              </Link>
          </li>
          <li>
          <Link to="">
            <FontAwesomeIcon icon={faCog} className="iconLeftbar" />
              <span className="text">Settings</span>
              </Link>
          </li>
          <li>
            <Link to ="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="iconLeftbar" />
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>


    </>
  );
}
