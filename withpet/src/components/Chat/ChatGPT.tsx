import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { addMessage } from 'redux/slice/Chat/chatSlice'
import spritesIcon from 'assets/sprites_icon.png'

interface APIResponse {
  choices: Array<{
    text: string
    finish_reason: string
    index: number
  }>
}

const ChatGPT: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.chat.messages)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputValue) return

    const API_URL = 'https://api.openai.com/v1/engine/davinci-codex/completions'
    const API_KEY = process.env.REACT_APP_GPT_APIKEY
    const prompt = inputValue
    const data = {
      prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    }

    try {
      const response = await axios.post<APIResponse>(API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      const newMessage = {
        content: response.data.choices[0].text,
        isUser: false,
      }
      dispatch(addMessage(newMessage))
      setInputValue('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 h-40 overflow-auto p-4">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`p-2 rounded-md ${
                index % 2 === 0 ? 'bg-primary-100 text-gray-900' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {message.content}
            </li>
          ))}메시지
        </ul>
      </div>
      <form onSubmit={handleFormSubmit} className="flex-none p-4">
        <div className="flex rounded-full bg-primary-100">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
            className="w-full p-2 bg-transparent focus:outline-none rounded-l-full"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r-full"
            style={{
              backgroundImage: `url(${spritesIcon})`,
              backgroundPosition: '-78px -311px',
              width: '25px',
              height: '25px',
            }}
          ></button>
        </div>
      </form>
    </div>
  )
}

export default ChatGPT
