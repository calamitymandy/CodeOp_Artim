import { useState } from "react";
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

var Editor = dynamic(() => import("../components/Editor"), {
  ssr: false
})

export default function CreationPost() {
  const router = useRouter()
  const [error, setError] = useState("");
  const [post, setPost] = useState({
    title: "",
    category: "",
    body: "",
    image1: "",
    image2: "",
    image3: "",
    video: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    setPost((post) => {
      return {
        ...post,
        [key]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost(post);
  };

  const addPost = async (post) => {
    try {
      const response = await fetch("http://localhost:5001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          Title: post.title,
          Category: post.category,
          Body: post.body,
          Image1: post.image1,
          Image2: post.image2,
          Image3: post.image3,
          Video: post.video,
        }),
      });
      //console.log("post---->", post);
      //console.log("response---->", response);
      
      if (response.ok) {
        const posts = await response.json();
        toast.success("You've created a blog post");
        setPost({
          title: "",
          category: "",
          body: "",
          image1: "",
          image2: "",
          image3: "",
          video: "",
        });
        router.push(`/post/${posts[posts.length -1].id}`);
        return posts;
      }
      setError("oups, something went wrong");
      toast.error("This didn't work.");
    } catch (error) {
      setError("oups, something went wrong");
      toast.error("This didn't work.")
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-hidden flex items-center justify-center font-alegreya-sans">
      <div className="rounded-lg bg-neutral-100 lg:w-6/12 md:9/12 w-12/12 shadow-2xl text-black p-8 text-center font-alegreya-sans">
      <h2 className=" drop-shadow-md text-5xl font-bold mx-auto text-teal-400 font-alegreya-sans">New post!</h2>
      <h3 className="italic mb-12 text-neutral-500">
          Write your article
        </h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="title">Title</label>
            <input 
              type="text"
              name="title"
              value={post.title}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={post.category}
              onChange={(e) => handleChange(e)}
              required 
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            >
              <option value="">Choose category</option>
              <option value="Traditional Art">Traditional Art</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Audiovisual">Audiovisual</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="body">Article</label>
            <div className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200">
            <Editor onEditorChange={(content) => setPost({ ...post, body: content })} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="image1">Image 1</label>
            <input
              type="text"
              name="image1"
              value={post.image1}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="image2">Image 2</label>
            <input 
              type="text"
              name="image2"
              value={post.image2}
              onChange={(e) => handleChange(e)}
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="image 3">Image 3</label>
            <input 
              type="text"
              name="image3"
              value={post.image3}
              onChange={(e) => handleChange(e)}
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-left" htmlFor="video">Video</label>
            <input 
              type="text"
              name="video"
              value={post.video}
              onChange={(e) => handleChange(e)}
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <button className="bg-yellow-300 text-white font-extrabold py-2 px-4 rounded-md hover:bg-yellow-500 w-full mb-8" type="submit">submit</button>
        </form>
      
      </div>
    </div>
  );
}
