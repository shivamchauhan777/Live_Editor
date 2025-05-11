import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Code from '@tiptap/extension-code';

import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

import '/src/Global.css';

// Create Yjs document and WebRTC provider
const ydoc = new Y.Doc();
const provider = new WebrtcProvider('tiptap-test-room', ydoc);   // use webRTC to connect the all new window/Tab together 



const user = {
  name: prompt("Enter your Name"),    // Take the name of a user as a input 
  color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`,  //Use hsl model to generate a random model 
};

const Tiptap = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    provider.awareness.setLocalStateField('user', user);   // store the name of a local user 

    const updateUsers = () => {
      const states = Array.from(provider.awareness.getStates().values());  // store all the users in the array to get the number of users are active 
      const activeUsers = states.map(state => state.user).filter(Boolean);  // iterate on all the users that are currenlty are activve 
      setUsers(activeUsers);
    };

    provider.awareness.on('change', updateUsers);  
    updateUsers(); // function that updata the changes made by the users

    return () => {
      provider.awareness.off('change', updateUsers);
    };  // 
  }, []);


  const editor = useEditor({   // Create the instance of the editor and extract all the features that we want 
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Link,
      Underline,
      Code,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: user,
      }),
    ],
  });

  if (!editor) return null;


  // Create the functionality of the Text_Editor
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleLink = () => {
    const url = prompt('Enter the URL');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };
  const undo = () => editor.chain().focus().undo().run();
  const redo = () => editor.chain().focus().redo().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderList = () => editor.chain().focus().toggleOrderedList().run();
  const paragraph = () => editor.chain().focus().setParagraph().run();
  const underline = () => editor.chain().focus().toggleUnderline().run();
  const setCode = () => editor.chain().focus().toggleCode().run();

  return (
    <div className='w-[80vw] lg:w-[60vw] mx-auto mt-16 p-5  bg-white rounded-xl  overflow-auto '>

      <div className='w-full border border-black rounded-xl  my-5 flex justify-start  items-center gap-4 sm:gap-8  px-2 py-2   font-semibold  overflow-auto'>



        <button
          onClick={toggleBold}
          className={`text-lg px-2 rounded-md bg-[url("")] bg-cover bg-center ${editor.isActive('bold') ? 'bg-blue-600 text-white' : ''}`}
        >
          B
        </button>

        <button
          onClick={toggleItalic}
          className={`text-lg px-2 rounded-md bg-[url("")] bg-cover bg-center ${editor.isActive('italic') ? 'bg-blue-600 text-white' : ''}`}
        >
          I
        </button>

        <button
          onClick={toggleLink}
          className={`px-2 rounded-md hover:cursor-pointer w-6 h-6 bg-[url("/images/link.png")] bg-cover bg-center ${editor.isActive('link') ? 'bg-blue-600' : ''}`}
        >
        </button>

        <button
          onClick={undo}
          className="px-2 rounded-md hover:cursor-pointer w-6 h-6 bg-[url('/images/undo.png')] bg-cover bg-center"
        >
        </button>

        <button
          onClick={redo}
          className="px-2 rounded-md hover:cursor-pointer w-6 h-6 bg-[url('/images/redo.png')] bg-cover bg-center"
        >
        </button>

        <button
          onClick={toggleBulletList}
          className={`px-2 rounded-md hover:cursor-pointer w-6 h-6 bg-[url('/images/bullet.png')] bg-cover bg-center ${editor.isActive('bulletList') ? 'bg-blue-600' : ''}`}
        >
        </button>

        <button
          onClick={toggleOrderList}
          className={`px-2 rounded-md hover:cursor-pointer w-6 h-6 bg-[url('/images/number.png')] bg-cover bg-center ${editor.isActive('orderedList') ? 'bg-blue-600' : ''}`}
        >
        </button>

        <button
          onClick={paragraph}
          className={`text-lg px-2 rounded-md hover:cursor-pointer bg-[url("")] bg-cover bg-center ${editor.isActive('paragraph') ? 'bg-blue-600 text-white' : ''}`}
        >
          P
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 rounded-md text-lg ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : ''}`}
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 rounded-md text-lg ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : ''}`}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 rounded-md text-lg ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : ''}`}
        >
          H3
        </button>

        <button
          onClick={underline}
          className={`px-2 rounded-md hover:cursor-pointer w-6 h-6 bg-[url("/images/Underline.png")] bg-cover bg-center ${editor.isActive('underline') ? 'bg-blue-600' : ''}`}
        >
        </button>

        <button
          onClick={setCode}
          className={`px-2 rounded-md hover:cursor-pointer bg-[url("")] bg-cover bg-center ${editor.isActive('code') ? 'bg-blue-600 text-white' : ''}`}
        >
          Code
        </button>


      </div>

      {/*To Render our Text Editor */}
      <EditorContent
        editor={editor}
        className="editor-content w-full min-h-[200px]   rounded shadow-inner border border-black text-black"
      />





    </div>
  )
};

export default Tiptap;
