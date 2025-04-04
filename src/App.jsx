


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
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
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

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="bg-[#0E0E0E] text-white min-h-screen overflow-x-hidden flex flex-col">
            <header className="pt-6 pb-4 flex items-center justify-between w-full px-6 sm:px-12 md:px-24 lg:px-48 xl:px-64">
                <h2 className='text-2xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>ZerothAI</h2>
                {isResponseScreen && (
                    <button id='newChatBtn' className='bg-[#181818] text-sm py-2 px-4 rounded-full cursor-pointer hover:bg-[#282828]' onClick={newChat}>
                        <IoCodeSlash className="inline-block mr-2 align-middle" /> New Chat
                    </button>
                )}
            </header>

            <main className="flex-grow overflow-y-auto">
                {isResponseScreen ? (
                    <div className="py-6 px-6 sm:px-12 md:px-24 lg:px-48 xl:px-64 flex flex-col space-y-4">
                        {messages?.map((msg, index) => (
                            <div key={index} className={`p-4 rounded-lg ${msg.type === 'userMsg' ? 'bg-[#181818] text-right' : 'bg-[#282828] text-left'}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <div className="py-12 px-6 sm:px-12 md:px-24 lg:px-48 xl:px-64 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl font-bold mb-8'>ZerothAI</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] bg-[#181818] p-6 flex flex-col justify-between min-h-[150px]" onClick={() => { setMessage("What is coding ? How we can learn it."); setisResponseScreen(true); hitRequest(); }}>
                                    <p className='text-lg mb-4'>What is coding? How can we learn it?</p>
                                    <i className='text-xl text-blue-400 self-end'><IoCodeSlash /></i>
                                </div>
                                <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] bg-[#181818] p-6 flex flex-col justify-between min-h-[150px]" onClick={() => { setMessage("Which is the red planet of the solar system?"); setisResponseScreen(true); hitRequest(); }}>
                                    <p className='text-lg mb-4'>Which is the red planet of the solar system?</p>
                                    <i className='text-xl text-orange-400 self-end'><BiPlanet /></i>
                                </div>
                                <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] bg-[#181818] p-6 flex flex-col justify-between min-h-[150px]" onClick={() => { setMessage("In which year was Python invented?"); setisResponseScreen(true); hitRequest(); }}>
                                    <p className='text-lg mb-4'>In which year was Python invented?</p>
                                    <i className='text-xl text-yellow-400 self-end'><FaPython /></i>
                                </div>
                                <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] bg-[#181818] p-6 flex flex-col justify-between min-h-[150px]" onClick={() => { setMessage("Suggest a workout routine for getting shredded."); setisResponseScreen(true); hitRequest(); }}>
                                    <p className='text-lg mb-4'>Suggest a workout routine for getting shredded.</p>
                                    <i className='text-xl text-green-400 self-end'><GiMuscleUp /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="py-4 px-6 sm:px-12 md:px-24 lg:px-48 xl:px-64 w-full flex flex-col items-center">
                <div className="inputBox w-full sm:w-3/4 lg:w-1/2 text-lg py-3 flex items-center bg-[#181818] rounded-full">
                    <input
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); }}
                        type="text"
                        className='p-3 pl-5 bg-transparent flex-1 outline-none border-none text-white'
                        placeholder='Ask Zeroth...'
                        id='messageBox'
                        onKeyDown={handleKeyPress}
                    />
                    {message && <i className='text-blue-500 text-xl mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>}
                </div>
                <p className='text-gray-500 text-sm mt-4'>ZerothAI developed by Harsh Tripathi. This AI uses the Gemini API for responses.</p>
            </footer>
        </div>
    );
};

export default App;