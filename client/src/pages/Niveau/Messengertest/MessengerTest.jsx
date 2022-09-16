
import "./messengerTest.css"
import Conversation from "../../../components/conversations/Conversation";
import Message from "../../../components/message/Message";
import ChatOnline from "../../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import photoLogo from "../../logo banner/logo0.png"

export default function MessengerTest() {
    const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (



    <>
     <div className="app">
    <div className="header">
      <div className="logo">
        
        <img src={photoLogo} alt="logo" />
        
      </div>
      <h1>WhyCall</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />   
      </div>
      <div className="user-settings">
        <div className="dark-light">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </div>
        <div className="settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >     
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>
        <img
                className="profileuserrphoto"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <h3 className="Usernamee">{user.username}</h3>
      </div>
    </div>
    <div className="wrapper">     
      <div className="conversation-area" ref={scrollRef}>
        <div className="msg online" ref={scrollRef}>
          <div className="msg-detail" ref={scrollRef}>
          {conversations.map((c) => (

<div style={{marginTop:"30px",width:"200px"}} onClick={() => setCurrentChat(c)}>
<h2 className="contacttext">Contacts : </h2>
<div className="usermessages">
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
<Conversation classname="conversationn"conversation={c} currentUser={user} />
  <Conversation classname="conversationn"conversation={c} currentUser={user} />
 
  </div>

</div>

))}
            
          </div>
         
        </div>
        
        <div className="chat-area-footer">
          
         
        </div>
        
      </div>
      <div class="chat-area">
   <div class="chat-area-header">
      <div class="chat-area-title">


      </div>
      
      </div>
      
      </div>
      
      <div class="chat-area-main">
      {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
               Start a Conversation Now On WhyCall
              </span>
            )}
      <div class="chat-msg">    
      </div>
      </div>   
      <div className="detail-area">
  
        <div className="detail-area-header">
            
          <div className="msg-profile group">
              
          <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}  
            />
          </div>
          <div className="detail-title">
            Gomycode
            </div>
          <div className="detail-subtitle">
            Created by Adam Azouz, 6 fevrier 2022
            </div>
          <div className="detail-buttons">
            <button className="detail-button">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"fill="currentColor"stroke="currentColor" strokeWidth={0}strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call 
            </button>
            <button className="detail-button">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-video"
              >
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
 </svg>
              Video Chat
            </button>
          </div>
        </div>  
        <div   className="follow-me" >
          <span className="follow-text">
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
            Follow me on WhyCall
          </span>
          <span className="developer">
            <img src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg" alt="PF" />
            Adam Azouz — @AdamAzouz
          </span>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}
