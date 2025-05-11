import React from 'react';
import Tiptap from './Components/Tiptap';

function App() {


  return (
    <>

      <div className="bg-[#101010] w-screen h-screen overflow-auto text- px-10">

        <h1 className=' font-bold text-3xl sm:text-5xl text-center pt-20 text-green-500'>Real Time Editor</h1>
        <Tiptap />
      </div>
    </>
  )
}

export default App
