import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const FirebaseChat = () => {
  const { senderId, recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (senderId && recipientId) {
      const messagesQuery = query(
        collection(db, 'chat'),
        where('participants', 'array-contains', senderId),
        orderBy('timestamp')
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const chatMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(chatMessages);
      });

      return () => unsubscribe();
    }
  }, [senderId, recipientId, messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        await addDoc(collection(db, 'chat'), {
          participants: [senderId, recipientId],
          senderId,
          recipientId,
          message: newMessage,
          timestamp: serverTimestamp(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.senderId === senderId ? 'You' : 'Other user'}: {message.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default FirebaseChat;