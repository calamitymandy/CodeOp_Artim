import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;
  //const post = props.post; // No funciona
  //console.log("props -----> ", props)
  //console.log("post -----> ", post)

  //llamada fetch utilizando el ID para obtener los detalles del post si es necesario
  //porque no lo he conseguido pasando props
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/posts/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setPost(json);
        })
        .catch((error) => {
          setError("Woops, something went wrong");
        });
    }
  }, [id]);

  return (
    <div className="bg-white min-h-screen overflow-hidden flex items-center justify-center font-alegreya-sans">
      <div className="rounded-lg bg-neutral-100 w-9/12 shadow-2xl text-black p-8 text-center font-alegreya-sans">
        {post.length > 0 ? (
          <>
            <div className="max-h-screen flex items-center justify-center">
              <img
                className="rounded-lg"
                src={post[0].Image1}
                alt={post[0].Title}
              />
            </div>

            <div className="mb-14 mt-20 text-2xl font-semibold">
              <span>{post[0].Title}</span>
            </div>

            <div
              className="mb-20 text-sm text-left text-neutral-600"
              dangerouslySetInnerHTML={{ __html: post[0].Body }}
            />
            <div className="font-bold text-left text-pink-700 mb-4">
              <span>Categories:</span>
            </div>
            <div className="bg-neutral-200 text-left w-fit text-neutral-600 py-2 px-4 rounded-md">
              <span> {post[0].Category}</span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
