import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Link from "next/link";

const PublicSearch = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [found, setFound] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInputChange = (e) => {
    setSearchedTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when a new search is initiated
    fetchData(1);
  };

  const fetchData = (page = totalPages) => {
    if (searchedTerm) {
      const apiUrl = `http://localhost:5001/public_search?searched=${searchedTerm}&page=${page}`;
      console.log("API URL:", apiUrl);

      setLoading(true);
      setError(null);

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Response Data:", response.data);
          if (response.data.message === "Found it") {
            setFound(response.data.message);
            setApiResponse(response.data);
            setTotalPages(response.data.pagination.totalPages);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setError(err);
          setLoading(false);
        });
    } else {
      setFound("");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [searchedTerm, currentPage]);

  return (
    <div className="bg-white h-screen flex-col items-center justify-top font-alegreya-sans">
      <div className=" text-black p-8 text-center font-alegreya-sans  drop-shadow-md ">
        <div>
          <h1 className="mb-2 text-5xl font-bold mx-auto text-pink-500 font-alegreya-sans ">
            Explore
          </h1>
          <h3 className="italic mb-12 text-neutral-500">
            posts, categories, artists...
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="px-8">
          <input
            type="text"
            placeholder="Enter search term"
            value={searchedTerm}
            onChange={handleInputChange}
            className=" rounded-lg py-2 px-12 border border-gray-300 w-[100%]"
          />
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : found ? (
        <div className=" text-black p-8 text-center font-alegreya-sans drop-shadow-md ">
          <div className="flex-col items-center mt-4">
            <ul className="grid grid-cols-4 gap-6">
              {apiResponse.postInfo.map((post) => (
                <li className="flex flex-col" key={post.id}>
                  <Link
                    className="rounded-lg overflow-hidden"
                    href={`/post/${post.id}`}
                    passHref
                  >
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
                </li>
              ))}
            </ul>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PublicSearch;
