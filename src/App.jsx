

import { useState, useRef, useEffect } from 'react';
import "./App.css";
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GiMuscleUp } from 'react-icons/gi';

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBalgTO8oKGwSR0jPIlIfSiN5wsikmgJ1A"); // Replace with your actual API key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(msg);

      const newMessages = [
        ...messages,
        { type: "userMsg", text: msg },
        { type: "responseMsg", text: result.response.text() },
      ];

      setMessages(newMessages);
      setisResponseScreen(true);
      setMessage("");
      console.log(result.response.text());
    } catch (error) {
      console.error("Error generating response:", error);
      alert("An error occurred while generating the response. Please try again.");
    }
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      hitRequest();
    }
  };

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="container min-w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
        {isResponseScreen ? (
          <div className='h-[80vh] flex flex-col'> {/* Use flexbox to manage layout */}
            <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
              <h2 className='text-2xl bg-gradient-to-r from-blue-700 via-pink-400 to-black'>ZenithAl</h2>
              <button id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]' onClick={newChat}>New Chat</button>
            </div>

            <div className="messages flex-grow overflow-y-auto p-4"> {/* Added flex-grow and overflow-y-auto */}
              {messages?.map((msg, index) => (
                <div key={index} className={`mb-2 p-3 rounded-lg ${msg.type === 'userMsg' ? 'bg-[#181818] text-right' : 'bg-[#282828] text-left'}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
            </div>
          </div>
        ) : (
          <div className="middle h-[80vh] flex items-center flex-col justify-center">
            <h1 className='bg-gradient-to-r from-blue-500 via-pink-600 to-black-500 text-4xl'>ZenithAI</h1>
            <div className="boxes mt-[30px] flex items-center gap-2">
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]" onClick={() => { setMessage("What is coding ? How we can learn it."); setisResponseScreen(true); hitRequest(); }}>
                <p className='text-[18px]'>What is coding ? <br /> How we can learn it.</p>
                <i className='absolute right-3 bottom-3 text-[18px]'><IoCodeSlash /></i>
              </div>
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]" onClick={() => { setMessage("Which is the red planet of solar system"); setisResponseScreen(true); hitRequest(); }}>
                <p className='text-[18px]'>Which is the red <br /> planet of solar <br /> system</p>
                <i className='absolute right-3 bottom-3 text-[18px]'><BiPlanet /></i>
              </div>
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]" onClick={() => { setMessage("In which year python was invented ?"); setisResponseScreen(true); hitRequest(); }}>
                <p className='text-[18px]'>In which year python <br /> was invented ?</p>
                <i className='absolute right-3 bottom-3 text-[18px]'><FaPython /></i>
              </div>
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]" onClick={() => { setMessage("Suggest a workout for getting shredded ?"); setisResponseScreen(true); hitRequest(); }}>
                <p className='text-[18px]'>Suggest a workout <br /> for getting shredded ?</p>
                <i className='absolute right-3 bottom-3 text-[18px]'><GiMuscleUp /></i>
              </div>
            </div>
          </div>
        )}

        <div className="bottom w-[100%] flex flex-col items-center">
          <div className="inputBox w-[60%] text-[25px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input value={message} onChange={(e) => { setMessage(e.target.value); }} type="text" className='p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' placeholder='Ask Zenith...' id='messageBox' onKeyDown={handleKeyPress} />
            {message && <i className='text-blue-600 text-[22px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>}
          </div>
          <p className='text-[gray] text-[17px] my-4'>ZenithAI developed by Harsh Tripathi. This AI uses Gemini API for giving the responses</p>
        </div>
      </div>
    </>
  );
};

export default App;