import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/Header/Header'
import Container from 'components/UI/Container'
import Navigation from 'components/Navigation/Navigation'
// import ChatGPT from 'components/Chat/ChatGPT'
// import ChatGpts from 'components/Chat/ChatGpts'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react'

const API_KEY = process.env.REACT_APP_GPT_APIKEY
const systemMessage = {
  role: 'system',
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
}

const Chatting = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map(messageObject => {
      let role = ''
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant'
      } else {
        role = 'user'
      }

      return { role: role, content: messageObject.message }
    })

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    }

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ])
        setIsTyping(false)
      })
  }
  const handleSend = async message => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    }

    const newMessages = [...messages, newMessage]

    setMessages(newMessages)

    setIsTyping(true)
    await processMessageToChatGPT(newMessages)
  }

  return (
    <>
      <Header title={'Chatting'} />
      <div className="mx-auto max-w-scr min-h-screen bg-gray-100 relative top-16 font-sans">
        <MainContainer style={{ border: 'none' }}>
          <ChatContainer>
            <MessageList
              style={{ position: 'relative', height: '750px' }}
              className="w-full relative z-50"
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message: string, i: number) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput
              className="mx-auto max-w-scr w-full fixed bottom-0 left-0 right-0 z-50"
              placeholder="Type message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
      <ChatContainer></ChatContainer>
      <Navigation title={'chatting'} />
    </>
  )
}

export default Chatting
