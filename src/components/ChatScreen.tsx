import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'seller';
  time: string;
}

interface ChatScreenProps {
  sellerName: string;
  productName: string;
  productImage: string;
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hi! Is this item still available?',
    sender: 'user',
    time: '10:30 AM',
  },
  {
    id: 2,
    text: 'Yes! It\'s brand new with tags. When would you like to pick it up?',
    sender: 'seller',
    time: '10:32 AM',
  },
  {
    id: 3,
    text: 'Can you do $250 for it?',
    sender: 'user',
    time: '10:35 AM',
  },
  {
    id: 4,
    text: 'I can do $265, that\'s my lowest. It\'s authenticated and in perfect condition.',
    sender: 'seller',
    time: '10:36 AM',
  },
];

export default function ChatScreen({ sellerName, productName, productImage, onClose }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');

    // Simulate seller response
    setTimeout(() => {
      const responses = [
        'Sounds good! Let me check and get back to you.',
        'Sure, I can work with that!',
        'Thanks for your interest! When can you meet?',
        'I\'ll hold it for you until tomorrow.',
      ];
      
      const response: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'seller',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-arrow-left text-gray-400 text-sm" />
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-bold">{sellerName[0]}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{sellerName}</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Online
              </p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-sm" />
          </button>
        </div>
      </div>

      {/* Product Context */}
      <div className="shrink-0 bg-gray-900/50 border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden">
            <img src={productImage} alt={productName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Regarding:</p>
            <p className="text-sm font-medium text-white truncate">{productName}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sender === 'user'
                  ? 'bg-violet-500 text-white'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${
                msg.sender === 'user' ? 'text-violet-200' : 'text-gray-400'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 bg-gray-950 border-t border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-plus text-gray-400" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim()
                ? 'bg-violet-500 active:scale-95'
                : 'bg-gray-800'
            }`}
          >
            <i className={`fa-solid fa-paper-plane text-sm ${
              newMessage.trim() ? 'text-white' : 'text-gray-500'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}
