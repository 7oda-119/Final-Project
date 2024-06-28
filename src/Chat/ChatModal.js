import React, { useEffect, useRef, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import './Chat.css';

function ChatModal({isOpen, closeModal, userId, recipientId, recipient, token}) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [lastTime, setLastTime] = useState(''); // Store lastTime in state
    const messagesRef = useRef(null);
    //const id = recipientId

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    const fetchMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/Chat/GetAllMyMessage?id=${recipientId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
                });
                const messageData = response.data;
    
                const messagesArray = Object.entries(messageData).map(([time, message]) => {
                    const [userId, content] = message.split(': '); // Split by colon
                    return {
                    time: time,
                    userId: userId,
                    content: content.trim() // Trim any extra spaces
                    };
                });
          
                setMessages(messagesArray);
                if (messagesArray.length > 0) {
                    setLastTime(messagesArray[messagesArray.length-1].time);
                }
                console.log('last time after fetch all', messagesArray[messagesArray.length].time)
    
    
                // Scroll to the bottom AFTER the state is updated and content is rendered
                //setTimeout(() => {
                  //  messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                //}, 0); 
            } catch (error) {
            console.error('Error fetching messages:', error);
            }
        };
    useEffect(()=>{
        
        fetchMessages();
    },[isOpen])
    

    

  // Start fetching messages when modal opens
  console.log('messages' ,messages)
  useEffect(() => {
      const fetchLastMessage = async()=>{
        if (messages) {
            try {
                const response = await axios.get(`${baseUrl}/api/Chat/GetNewMessages?id=${recipientId}&date=${lastTime}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
                },
                });
                const newMessageData = Object.entries(response.data).map(([time, message]) => {
                    const [userId, content] = message.split(': ');
                    return {
                    time: time,
                    senderId: userId,
                    content: content.trim()
                    };
                });

                if(newMessageData.length > 0){
                    const lastMessage = newMessageData[newMessageData.length - 1];
                    const updatedMessages = [...messages, lastMessage];
                    setMessages(updatedMessages);
                    setLastTime(newMessageData[newMessageData.length-1].time);
                }
                    
                
                /*const lastMessage = [...messages, newMessageData[newMessageData.length - 1]]
                if((messages.length-1 !== lastMessage)){
                    setMessages(lastMessage); 
                }*/

                // Scroll to the bottom AFTER the state is updated and content is rendered
                setTimeout(() => {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }, 0); 
                
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
    }
        if (isOpen) {
            const intervalId = setInterval(fetchLastMessage, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isOpen, lastTime ]);

  const handleSendMessage = async () => {
    try {
        const response = await axios.post(`${baseUrl}/api/Chat/SendMessage`, { id: recipientId, message: newMessage }, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
            },
        });
        setNewMessage('');
        const newMessageData = Object.entries(response.data).map(([time, message]) => {
            const [userId, content] = message.split(': ');
            return {
            time: time,
            senderId: userId,
            content: content.trim()
            };
        });
        const lastMessage = newMessageData[newMessageData.length - 1];
        setMessages([...messages, lastMessage]);
        setLastTime(newMessageData[newMessageData.length-1].time);
          
        console.log('last time after send', lastTime)

        //fetchLastMessage();
        //const lastMessage = newMessageData[newMessageData.length - 1];

        // Update the messages state
        //setMessages(newMessageData); // Add only the last message
        // Scroll to the bottom AFTER the state is updated and content is rendered
        setTimeout(() => {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }, 0); 
        console.log(messages);
    } catch (error) {
      console.error('Error sending message to api:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" style={{ maxWidth: '700px', marginLeft: '530px' }}>
        <div className="modal-content" >
            <div className="modal-header">
            <h5 className="modal-title">CHAT</h5>
            <button type="button" className="btn-close" onClick={() => {
                closeModal();
                }}>
            </button>
            </div>
            <div className="modal-body"  style={{height: 'auto', maxHeight: '600px', overflowY: 'auto'}}>
            <div className="chat-container" >
                <div className="chat-header">
                    Chat with {recipient}
                </div>
                <div className="chat-messages" ref={messagesRef}>
                    {console.log(messages)}
                    {messages.map((msg) => ( 
                    <div key={msg.id} className={`chat-message ${msg.userId === recipientId ?  'received' : 'sent' }`}>
                        
                        <div className="chat-message-content">
                        <p>{msg.content}</p>
                        <span className="chat-timestamp">{new Date(msg.time).toLocaleTimeString()}</span>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="chat-input">
                    <textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}><IoMdSend /></button>
                </div>
                </div>
            </div>
            <div className="modal-footer">
            <button type="button" className='btn btn-secondary' onClick={() => {closeModal()}}>Close</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ChatModal;