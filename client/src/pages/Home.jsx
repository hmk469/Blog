import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const[description,setDescription] =useState('')

  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    const response = await fetch('http://localhost:5000/get-blogs');
    const data = await response.json();
    setPosts(data.blogs);
  }

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      toast.success('Blog deleted successfully');
    } else {
      toast.error('Something went wrong');
    }
  }

  const updatePost = async (id) => {
    const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editedTitle, description: description }),
    });
  
    if (response.status === 200) {
      toast.success("Blog updated successfully");
    } else {
      toast.error("Something went wrong");
    }
  }
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-10 flex flex-col gap-10">
        {posts.map((post) => (
          <div className="w-[40vw] mx-auto p-3 border-2 rounded-md shadow-md" key={post._id}>
            <div className="flex justify-end text-lg gap-3">
              <AiFillDelete
                onClick={() => deletePost(post._id)}
                className="text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110"
              />
              <MdOutlineEdit
                onClick={() => {
                  setEditPost(!editPost);
                  setSelectedPost(post._id);
                }}
                className={`${
                  selectedPost === post._id && editPost
                    ? 'text-red-400 scale-110'
                    : 'text-gray-400'
                } hover:text-green-400 cursor-pointer hover:scale-110`}
              />
            </div>
            <h2
              className="text-xl font-bold selection:text-green-300 outline-none focus:bg-gray-100 font-bold"
              contentEditable={editPost}
              onInput={(e) => setEditedTitle(e.currentTarget.textContent)}
            >
              {editedTitle || post.title}
            </h2>
            <h3 className="text-xl text-gray-500 selection:text-green-300 outline-none focus:bg-gray-100"    
            contentEditable={editPost}            onInput={(e) => setDescription(e.currentTarget.textContent)}
>{post.description}</h3>
            <button
              className={`${
                selectedPost === post._id && editPost ? 'block' : 'hidden'
              } bg-purple-400 hover:bg-purple-600 px-3 py-1 rounded-md font-bold text-white`}
              onClick={() => updatePost(post._id)}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
