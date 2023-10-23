import { useState, useEffect } from "react";
import Link from "next/link";

export function PostsList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/posts")
      .then((res) => res.json())
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => {
        setError("Woops, something went wrong");
      });
  }, []);

  return (
    <>
      <div className="p-10">
        <div className="grid grid-cols-4 gap-6">
          {posts.map((post) => (
            <div className="flex flex-col" key={post.id}>
              <Link 
              className="rounded-lg overflow-hidden"
              href={`/post/${post.id}`} passHref>
                <img src={post.Image1} alt={post.Title} />
              </Link>
              <div className="mb-2 mt-1 font-semibold">
                <span>{post.Title}</span>
              </div>
              <div
                className="mb-4 h-24 overflow-hidden text-xs text-neutral-500"
                dangerouslySetInnerHTML={{ __html: post.Body }}
              />
              <div className="bg-neutral-200 text-xs text-left w-fit text-neutral-600 py-1 px-2 rounded-md">
                <span>{post.Category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
