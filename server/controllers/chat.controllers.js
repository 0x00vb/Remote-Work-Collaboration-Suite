import Chat from '../models/Chat';
import User from '../models/User';


export const fetchAllChats = async (req, res) => {
    try {
      const chats = await Chat.find().populate('users', 'username'); // Populate the 'users' field with usernames only
  
      res.json(chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'Failed to fetch chats' });
    }
  }

export const accessSelectedChat = async (req, res) => {
    try {
        const { chatId } = req.params; // Assuming chatId is passed as a parameter
        const chat = await Chat.findById(chatId)
            .populate('users', '-password')
            .populate('latestMessage')
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Optionally, you can populate additional fields as needed

        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
