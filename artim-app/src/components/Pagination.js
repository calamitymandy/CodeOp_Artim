import React from "react";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const nextOnClick = () => onPageChange(currentPage + 1);
  const previousOnClick = () => onPageChange(currentPage - 1);
  return (
    <div className="mt-12 text-white font-bold ml-[auto] w-[fit-content] flex py-2 px-4 gap-2 rounded-md bg-pink-500">
      <button onClick={previousOnClick} disabled={isPreviousDisabled}>
        <TbPlayerTrackPrevFilled />
      </button>
      {`${currentPage} of ${totalPages}`}
      <button onClick={nextOnClick} disabled={isNextDisabled}>
        <TbPlayerTrackNextFilled />
      </button>
    </div>
  );
};

export default Pagination;
