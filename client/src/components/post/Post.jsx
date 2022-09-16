import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify,faHeart,faComments,faShareSquare} from '@fortawesome/free-solid-svg-icons'

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="boxess">
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <div>
            <span className="postusername">{user.username}</span>
            </div>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
          <FontAwesomeIcon icon={faAlignJustify} className="param" style={{width:"80px"}}  />
          </div>
        </div>
        <div className="postcenter">
          <div >
          <span className="posttext">{post?.desc}</span>
          </div>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          
          <div className="postBottomLeft"> 
          <FontAwesomeIcon icon={faHeart} className="likeIcon heart" onClick={likeHandler} style={{width:"27px"}}  />
              
            <span className="postLikeCounter" >{like} </span>
          </div>

          <div className="postBottomLeft"> 
              <FontAwesomeIcon icon={faComments} className="likeIcon comment" style={{width:"27px"}}    />
            <span className="postCommentCounter" >200 </span>
          </div>
          
          <div className="postBottomLeft"> 
              <FontAwesomeIcon icon={faShareSquare} className="likeIcon sharer" style={{width:"27px"}}   />
            <span className="postshareCounter"  >100 </span>
          </div>
        
        </div>
        
      </div>
    </div>
    </div>
  );
}
