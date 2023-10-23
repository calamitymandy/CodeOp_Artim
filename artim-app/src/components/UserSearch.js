import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Divider, Button } from "@nextui-org/react";
import { BsSearchHeart } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import Pagination from "./Pagination";
import HighlightText from "./HighlightText";
import { useAuth } from "./AuthContext";

const UserSearch = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [found, setFound] = useState("");
  const [foundImage, setFoundImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userFound, setUserFound] = useState(false);
  const { token } = useAuth();
  let debounceTimeout;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchedTerm(newValue);

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      fetchData(currentPage);
    }, 300); // Adjust the delay (in milliseconds) as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when a new search is initiated
    fetchData(1);
  };

  const fetchData = (page = totalPages) => {
    if (searchedTerm) {
      const apiUrl = `http://localhost:5001/user_search/${searchedTerm}?page=${page}`;
      console.log("API URL:", apiUrl);
      console.log("private search");
      console.log(token);

      setLoading(true);
      setError(null);

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response Data:", response.data);
          if (response.data.message === "Found it") {
            setFound(response.data.message);
            setApiResponse(response.data);
            setTotalPages(response.data.pagination.totalPages);
            setFoundImage(response.data.postInfo[0].Image1);
            if (response.data.userInfo) {
              setUserFound(true);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setError(err);
          setLoading(false);
        });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  // useEffect(() => {
  //   fetchData(currentPage);
  // }, [searchedTerm, currentPage]);

  return (
    <div>
      <div className="items-center gap-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter search term"
            value={searchedTerm}
            onChange={handleInputChange}
          />
        </form>
        {foundImage && (
          <Image src={foundImage} shadow="lg" layout="responsive" isZoomed />
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : found ? (
        <div>
          <div className="flex items-center gap-2">
            {apiResponse.message} <IoCheckmarkDoneCircleSharp />
          </div>

          {/* <Divider className="my-4" />
          <div className="flex gap-6 justify-end">
            <h2>Pagination:</h2>
            <h4>Total Pages: {apiResponse.pagination.page}</h4>
            <h4> Max Posts x Page : {apiResponse.pagination.limit}</h4>
            <h4>Total Posts: {apiResponse.pagination.totalPostInfoCount}</h4>
      </div>*/}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <ul>
            {apiResponse.postInfo.map((item) => (
              <li key={item.id}>
                <div>
                  <Divider className="my-4" />
                  {Array.isArray(item.Title) ? (
                    item.Title.map((v) => (
                      <HighlightText
                        key={v}
                        value={v}
                        highlight={searchedTerm}
                      />
                    ))
                  ) : (
                    <HighlightText
                      key={item.Title}
                      value={item.Title}
                      highlight={searchedTerm}
                    />
                  )}
                  <Divider className="my-4" />
                  <Image
                    src={item.Image1}
                    alt={item.Title}
                    shadow="lg"
                    layout="responsive"
                    isZoomed
                  />
                  {Array.isArray(item.Category) ? (
                    item.Category.map((v) => (
                      <HighlightText
                        key={v}
                        value={v}
                        highlight={searchedTerm}
                      />
                    ))
                  ) : (
                    <HighlightText
                      key={item.Category}
                      value={item.Category}
                      highlight={searchedTerm}
                    />
                  )}
                  <Divider className="my-4" />
                  {Array.isArray(item.Body) ? (
                    item.Body.map((v) => (
                      <HighlightText
                        key={v}
                        value={v}
                        highlight={searchedTerm}
                      />
                    ))
                  ) : (
                    <HighlightText
                      key={item.Body}
                      value={item.Body}
                      highlight={searchedTerm}
                    />
                  )}
                  <Divider className="my-4" />
                </div>
              </li>
            ))}
          </ul>

          {userFound ? (
            <ul>
              {apiResponse.userInfo.map((item) => (
                <li key={item.UserID}>
                  <div>
                    <Divider className="my-4" />
                    {Array.isArray(item.FullName) ? (
                      item.FullName.map((v) => (
                        <HighlightText
                          key={v}
                          value={v}
                          highlight={searchedTerm}
                        />
                      ))
                    ) : (
                      <HighlightText
                        key={item.FullName}
                        value={item.FullName}
                        highlight={searchedTerm}
                      />
                    )}
                    <Divider className="my-4" />
                    {Array.isArray(item.UserCategory) ? (
                      item.UserCategory.map((v) => (
                        <HighlightText
                          key={v}
                          value={v}
                          highlight={searchedTerm}
                        />
                      ))
                    ) : (
                      <HighlightText
                        key={item.UserCategory}
                        value={item.UserCategory}
                        highlight={searchedTerm}
                      />
                    )}
                    <Divider className="my-4" />
                    {Array.isArray(item.UserBio) ? (
                      item.UserBio.map((v) => (
                        <HighlightText
                          key={v}
                          value={v}
                          highlight={searchedTerm}
                        />
                      ))
                    ) : (
                      <HighlightText
                        key={item.UserBio}
                        value={item.UserBio}
                        highlight={searchedTerm}
                      />
                    )}
                    <Divider className="my-4" />
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default UserSearch;
