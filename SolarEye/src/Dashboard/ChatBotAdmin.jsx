
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MessageCircle, Search, Send, Loader, CheckCheck } from 'lucide-react';

// const AdminChatPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [reply, setReply] = useState('');
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch all messages grouped by user
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get('http://localhost:10000/api/getMessagesForAdmin', { withCredentials: true });
//         // Group messages by user
//         const userMessages = response.data.messages.reduce((acc, msg) => {
//           const userId = msg.user._id;
//           if (!acc[userId]) {
//             acc[userId] = {
//               user: msg.user,
//               messages: []
//             };
//           }
//           acc[userId].messages.push(msg);
//           return acc;
//         }, {});
        
//         // Convert to array and sort by latest message
//         const usersArray = Object.values(userMessages).map(userData => ({
//           ...userData,
//           lastMessage: userData.messages[userData.messages.length - 1],
//           unreadCount: userData.messages.filter(msg => !msg.isReplied).length
//         }));
        
//         setUsers(usersArray);
//         // Select first user by default if available
//         if (usersArray.length > 0 && !selectedUserId) {
//           setSelectedUserId(usersArray[0].user._id);
//         }
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const handleReply = async (messageId) => {
//     if (!reply.trim()) return;

//     setLoading(true);
//     try {
//       await axios.post('http://localhost:10000/api/replyToMessage', {
//         messageId: messageId,
//         adminReply: reply,
//       }, { withCredentials: true });

//       // Update local state
//       setUsers(prevUsers => 
//         prevUsers.map(userData => {
//           if (userData.user._id === selectedUserId) {
//             return {
//               ...userData,
//               messages: userData.messages.map(msg => 
//                 msg._id === messageId 
//                   ? { ...msg, adminReply: reply, isReplied: true }
//                   : msg
//               )
//             };
//           }
//           return userData;
//         })
//       );

//       setReply('');
//     } catch (error) {
//       alert('Error sending reply: ' + (error.response?.data?.error || 'Unknown error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredUsers = users.filter(userData => 
//     userData.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     userData.lastMessage?.userMessage.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectedUser = users.find(userData => userData.user._id === selectedUserId);

//   const formatDate = (date) => {
//     return new Date(date).toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="h-screen flex">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
//         {/* Search Header */}
//         <div className="p-4 bg-gray-50 border-b">
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* User List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.map((userData) => (
//             <div
//               key={userData.user._id}
//               onClick={() => setSelectedUserId(userData.user._id)}
//               className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
//                 selectedUserId === userData.user._id ? 'bg-blue-50' : ''
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <span className="text-blue-600 font-medium">
//                     {userData.user.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-medium text-gray-900">{userData.user.name}</h3>
//                     {userData.unreadCount > 0 && (
//                       <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
//                         {userData.unreadCount}
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500 truncate">
//                     {userData.lastMessage?.userMessage}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Chat Area */}
//       {selectedUser ? (
//         <div className="flex-1 flex flex-col bg-[#f0f2f5]">
//           {/* Chat Header */}
//           <div className="p-4 bg-white border-b flex items-center space-x-3">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//               <span className="text-blue-600 font-medium">
//                 {selectedUser.user.name.charAt(0).toUpperCase()}
//               </span>
//             </div>
//             <div>
//               <h2 className="font-medium">{selectedUser.user.name}</h2>
//               <p className="text-sm text-gray-500">{selectedUser.user.email}</p>
//             </div>
//           </div>

//           {/* Messages Area */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             {selectedUser.messages.map((msg, index) => (
//               <div key={msg._id} className="mb-4">
//                 <div className="max-w-[80%] bg-white p-4 rounded-lg shadow-sm">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-600 text-sm">User Message:</span>
//                     <span className="text-xs text-gray-500">{formatDate(msg.createdAt)}</span>
//                   </div>
//                   <p>{msg.userMessage}</p>
//                 </div>
                
//                 {msg.adminReply ? (
//                   <div className="max-w-[80%] bg-blue-100 p-4 rounded-lg shadow-sm mb-4 ml-auto mt-2">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600 text-sm">Your Reply:</span>
//                       <CheckCheck className="w-4 h-4 text-blue-500" />
//                     </div>
//                     <p>{msg.adminReply}</p>
//                   </div>
//                 ) : (
//                   <div className="max-w-[80%] ml-auto mt-2">
//                     <button
//                       onClick={() => handleReply(msg._id)}
//                       className="text-blue-500 text-sm hover:underline"
//                     >
//                       Reply to this message
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Reply Input Area */}
//           <div className="p-4 bg-white">
//             <div className="relative">
//               <textarea
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 placeholder="Type a reply..."
//                 className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:border-blue-500 resize-none"
//                 rows="3"
//                 disabled={loading}
//               />
//               <button
//                 onClick={() => {
//                   const unrepliedMessage = selectedUser.messages.find(msg => !msg.isReplied);
//                   if (unrepliedMessage) {
//                     handleReply(unrepliedMessage._id);
//                   }
//                 }}
//                 disabled={loading || !selectedUser.messages.some(msg => !msg.isReplied)}
//                 className="absolute right-2 bottom-2 p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400"
//               >
//                 {loading ? (
//                   <Loader className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Send className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex-1 flex items-center justify-center bg-gray-50">
//           <p className="text-gray-500">Select a user to view their messages</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminChatPage;

// AdminChat.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   // Initialize socket connection
  //   const newSocket = io('http://localhost:10000', {
  //     auth: {
  //       token: localStorage.getItem('token') // Your JWT token
  //     }
  //   });
    useEffect(() => {
      // Get the token from cookies
      const token = Cookies.get('token'); // Replace 'token' with your cookie name if it's different
    
      // Initialize socket connection
      const newSocket = io('http://localhost:10000', {
        auth: {
          token, // Pass the token from cookies
        },
      });
    
    //   setSocket(newSocket); // Set the socket in the state
    
    //   // Clean up on unmount
    //   return () => newSocket.close();
    // }, []);
    setSocket(newSocket);

    // Fetch all messages for admin
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:10000/api/getMessagesForAdmin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('chatMessage', (message) => {
      setMessages(prev => [message, ...prev]);
    });
  }, [socket]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedMessage) return;

    try {
      await axios.post('http://localhost:10000/api/replyToMessage',
        {
          messageId: selectedMessage._id,
          adminReply: reply
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update local state
      setMessages(prev => prev.map(msg =>
        msg._id === selectedMessage._id
          ? { ...msg, adminReply: reply, isReplied: true }
          : msg
      ));

      setReply('');
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Messages List */}
      <div className="w-1/2 p-4 overflow-y-auto border-r">
        <h2 className="text-xl font-semibold mb-4">Customer Messages</h2>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`p-4 rounded-lg shadow cursor-pointer ${
                selectedMessage?._id === message._id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white'
              } ${
                !message.isReplied ? 'border-l-4 border-yellow-500' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{message.user?.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{message.userMessage}</p>
              {message.adminReply && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm font-medium text-gray-500">Your Reply:</p>
                  <p className="text-gray-700">{message.adminReply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reply Section */}
      <div className="w-1/2 p-4">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Reply to {selectedMessage.user?.name}</h3>
              <p className="text-gray-700 mt-2">{selectedMessage.userMessage}</p>
            </div>

            <form onSubmit={handleReply} className="mt-auto">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your reply..."
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMessage(null);
                    setReply('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a message to reply
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;