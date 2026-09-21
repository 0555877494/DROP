import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

export default function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! Welcome to DROP Support. How can I help you today?',
      sender: 'support',
      time: '10:00 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    
    setMessages([...messages, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = [
        'I\'d be happy to help you with that! Let me look into this for you.',
        'Thanks for reaching out! I can definitely assist you with this issue.',
        'I understand your concern. Let me check our system and get back to you shortly.',
        'Great question! Here\'s what you need to know...',
      ];
      
      const supportMsg: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'support',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, supportMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <i className="fa-solid fa-headset text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">DROP Support</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Online • Avg. response: 2 min
            </p>
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
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="shrink-0 px-4 py-2 border-t border-white/5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['Order Status', 'Return Item', 'Payment Issue', 'Account Help'].map((action, i) => (
            <button
              key={i}
              onClick={() => setNewMessage(action)}
              className="px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 text-xs font-medium whitespace-nowrap"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 bg-gray-950 border-t border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
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
