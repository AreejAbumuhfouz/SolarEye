// // const express = require('express');
// // const router = express.Router();
// // const messageController = require('../Controller/chatController'); // Update the path as needed

// // // Send a message from a customer
// // router.post('/send-message', messageController.sendMessage);

// // // Reply to a message from an admin
// // router.post('/reply-message', messageController.replyMessage);

// // // Fetch all messages
// // router.get('/get-messages', messageController.getMessages);

// // // Edit a message
// // router.put('/edit-message', messageController.editMessage);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../config/authMiddleware');  // Your auth middleware
// const messageController = require('../Controller/chatController');

// // Apply authMiddleware to protected routes
// router.post('/sendMessage', authMiddleware, messageController.sendMessage);
// router.get('/getMessages', authMiddleware, messageController.getMessages);
// router.get('/getMessagesForAdmin', authMiddleware, messageController.getMessagesForAdmin);
// router.post('/replyToMessage', authMiddleware, messageController.replyToMessage);

// module.exports = router;


const express = require('express');
const { sendMessage, getMessages, getMessagesForAdmin, replyToMessage } = require('../Controller/chatController');
const authMiddleware = require('../config/authMiddleware');

const router = express.Router();

// Routes for chat-related functionality
router.post('/sendMessage', authMiddleware, sendMessage); // Send message
router.get('/getMessages', authMiddleware, getMessages); // Get messages for the logged-in user
router.get('/getMessagesForAdmin', authMiddleware, getMessagesForAdmin); // Get messages for admin
router.post('/replyToMessage', authMiddleware, replyToMessage); // Admin replies to a message

module.exports = router;
