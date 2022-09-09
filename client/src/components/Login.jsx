import React from 'react'
import { useState } from 'react'
import socket from '../config/socket'
const Login = ({ setUser }) => {
    const [name, setName] = useState("")


    const handleOnchange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser(name);
        socket.emit("conectado", name)
    }

    return (
        <div className='w-screen h-screen grid justify-center content-center bg-gradient-to-r from-[#0096FF] to-[#00D7FF]'>
            <form onSubmit={handleSubmit} className="h-64 w-96  bg-[#5800FF] border-4 border-white p-3 rounded-lg ">
                <div className='my-3'>
                    <label htmlFor="name" className='text-white font-extrabold font-mono text-2xl my-2 inline-block'>Nombre</label>
                    <input type="text" id='name' className='w-full outline-none rounded-lg py-2 px-4 placeholder:px-4 hover:placeholder:text-black focus:border-l-8 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400  ' placeholder='Ingrese su Nombre' value={name} onChange={handleOnchange} />
                </div>
                <div className='text-center'>
                    <button type='submit' className='border border-white w-32 px-1 my-12 rounded-lg text-gray-900 bg-[#72FFFF] active:scale-105 active:outline-none  active:ring-2 active:ring-white'>Login</button>

                </div>
            </form>
        </div>
    )
}

export default Login