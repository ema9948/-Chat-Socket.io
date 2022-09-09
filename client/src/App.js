import { useEffect, useRef, useState } from "react";
import Login from "./components/Login";
import socket from "./config/socket";
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [offline, setOffline] = useState(false)

  //!conect
  useEffect(() => {
    const recived = (message) => {
      if (user === message) return
      if (user !== message) {
        toast((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}`} >
            <span>se conecto {message} </span>

          </div >
        ))
      }

    }


    socket.on("online", recived)
    return () => {
      socket.off("online", recived)
    }
  }, [])


  //! discconect
  useEffect(() => {
    const recived = (message) => {

      if (user === message) return
      if (user !== message) {
        toast(`Se desconecto ${message} `)
      }

    }

    socket.on("offline", recived)
    return () => {
      socket.off("online", recived)
    }

  }, [offline])

  useEffect(() => {
    if (offline) {
      setUser("");
      setOffline(false)
    }
  }, [offline])

  //!receivi messajes
  useEffect(() => {
    const recived = (message) => {
      setMessages([...messages, message])
    }
    socket.on("message", recived);
    return () => {
      socket.off("message", recived);
    }
  }, [messages])


  //!send messajes
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", message, user)
    setMessages([...messages, { body: message, user: user }])
    setMessage("")

  }

  const handleClick = () => {
    socket.emit("disconect", user)
    setOffline(true)
  }

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  })

  return (
    <>
      {
        !user &&
        <Login setUser={setUser} />
      }

      {
        user &&
        <div className="h-screen grid justify-center content-center bg-gradient-to-tr from-[#1dbde6] to-[#f1515e] ">
          <div className="w-96">
            <div>
              <Toaster />
            </div>
            <h1 className="text-5xl text-center font-serif font-extrabold hover:text-rose-600 hover:scale-110 text-white my-5">-Chat Rom-</h1>
            <div className="px-5 shadow-Neumorphism rounded-3xl bg-gradient-to-r from-[#439cfb] to-[#f187fb]">
              <div className="py-5">
                <ul className="h-96 bg-gradient-to-t from-[#30c5d2] to-[#471069] rounded-xl p-5  overflow-auto  " >
                  {
                    messages.map((item, index) => {
                      if (item.body === "") return
                      if (item.user === user) {
                        return (<li className="my-3 text-start" key={index}><span className=" rounded-md bg-sky-500 text-black p-2 break-words inline-block max-w-texto " >{item.body}</span> </li>)
                      }
                      if (item.user !== user) {
                        return (<li className="my-3 text-end" key={index}><span className="rounded-md bg-white text-black font-sans p-1 break-words inline-block max-w-texto " >{item.body} <span className="font-serif font-bold text-100">({item.user}) </span></span> </li>)

                      }
                    })
                  }
                  <div ref={divRef}></div>
                </ul>
              </div>
              <form onSubmit={handleSubmit} className="my-5 text-center" >
                <input type="text" className="my-1 w-full rounded-md px-1 focus:outline-none focus:border-sky-500 border  border-slate-300 placeholder:text-center placeholder-slate-400 bg-white focus:ring-2 focus:ring-sky-500 " value={message} placeholder="mensaje" onChange={(e) => setMessage(e.target.value)} />
                <button className="border-2 active:scale-105 border-white my-3 py-1 px-3 rounded-md text-white outline-none  hover:text-blue-500 hover:border-blue-500 ">send</button>

              </form>

            </div>

            <div>
              <button onClick={handleClick} className="active:scale-105 border-2 border-white my-3 py-1 px-3 rounded-md text-white outline-none  hover:text-black hover:border-black ">
                Log out
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
