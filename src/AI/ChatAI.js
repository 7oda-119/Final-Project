import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import logo from '../Auth/image/logo.png'
import './AI.css'
import { baseUrl } from '../Api/Api';
import Blob from '../components/Blob';
function ChatAI() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const messagesRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add the user's message to the allMessages array
    setAllMessages((prevMessages) => [...prevMessages, { userMessage: message }]);
    setMessage('');
    setLoading(true)
    try {
        // Using Axios to make the API call
        const response = await axios.post(`${baseUrl}/api/AIAssistant/Ask-Any-Question?quesiton=${message}`);

        // Add the AI's response to the allMessages array
        console.log(response.data);
        setAllMessages((prevMessages) => [...prevMessages, { aiResponse: response.data }]);
      console.log(message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
        console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ minHeight: '89vh' }}>
            <h4 className='text-center mt-2'>AI Assistant</h4>
            <div className="AI-chat-container">
            <div className="messages" ref={messagesRef}>
              {allMessages.length > 0? (
                allMessages.map((msg, index) => (
                  <div key={index} className="message-pair">
                    {msg.userMessage && (
                      <div className="message-container">
                        <FaUser className="avatar" />
                        <div className="message">{msg.userMessage}</div>
                      </div>
                    )}
                    {msg.aiResponse && (
                      <div className="response-container">
                        <FaRocketchat className="avatar" />
                        <div className="response">{(msg.aiResponse).replace(/\*|`|"""|#/g, "")}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-messages">
                  <h4 className='text-center mt-5'>How can I help you?</h4>
                  <p className='text-center mt-1' style={{color:'crimson'}}>Waiting for your question....</p>
                </div>
              )}
              <div className='text-center'>
                {loading && <Blob />}
              </div>
            </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="input-box"
                    />
                    <button onClick={sendMessage} className="send-button">Send</button>
                </div>
            </div>
        </div>
  )
}

export default ChatAI;