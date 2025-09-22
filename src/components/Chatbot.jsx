'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Debug: Log when component mounts
  useEffect(() => {
    console.log('Chatbot component mounted')
  }, [])
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm UZA Solutions assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const quickReplies = [
    "What services do you offer?",
    "How can I contact you?",
    "Tell me about UZA Bulk",
    "What is Wikwigora?",
    "Where are you located?"
  ]

  const botResponses = {
    "what services do you offer": "We offer comprehensive supply chain solutions including UZA Bulk (bulk procurement), UZA Mall (e-commerce marketplace), UZA Logistics (end-to-end logistics), and UZA Cloud (cloud infrastructure). We also run the Wikwigora community development campaign.",
    "how can i contact you": "You can reach us at:\n📧 Email: info@uzasolutionsltd.com\n📞 Phone: +250 788 371 081\n🌐 Website: uzasolutionsltd.com\n📍 Address: Nyarurembo, Kiyovu, Nyarugenge, Kigali, Rwanda",
    "tell me about uza bulk": "UZA Bulk is our bulk procurement platform that connects businesses with manufacturers and suppliers. It offers direct-from-factory sourcing, competitive pricing, and reliable logistics for construction materials, industrial equipment, and more. Visit uzabulk.com to learn more!",
    "what is wikwigora": "Wikwigora means 'to develop' in Kinyarwanda. It's our flagship community development campaign that empowers communities through sustainable development, infrastructure projects, skills training, and economic growth initiatives across Rwanda.",
    "where are you located": "We have offices in:\n🇭🇰 Hong Kong: New City, 2 Lei Yue Mun Rd, Kwun Kong\n🇷🇼 Rwanda: Nyarurembo, Kiyovu, Nyarugenge, Kigali\nWe serve clients across Africa and globally.",
    "default": "Thank you for your question! For more detailed information, please contact us at info@uzasolutionsltd.com or call +250 788 371 081. Our team will be happy to assist you with any specific inquiries about our services."
  }

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response
      }
    }
    return botResponses.default
  }

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleQuickReply = (reply) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => {
          console.log('Chatbot button clicked, current state:', isOpen)
          setIsOpen(!isOpen)
        }}
        className="fixed bottom-6 right-6 z-[9999] bg-[#FBAF43] hover:bg-[#e59e3b] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-[9998] w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#213348] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FBAF43] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">UZA Assistant</h3>
                  <p className="text-xs text-gray-300">Online now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-[#FBAF43]' : 'bg-[#213348]'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-3 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-[#FBAF43] text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#213348] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-[#FBAF43] hover:text-white text-gray-700 px-2 py-1 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-[#FBAF43] hover:bg-[#e59e3b] disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
