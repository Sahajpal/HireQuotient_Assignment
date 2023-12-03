import { IconButton, Typography } from "@material-tailwind/react";
import PreviousPage from "../assets/previous_icon.svg";
import NextPage from "../assets/next_icon.svg";
import FirstPage from "../assets/begin_icon.svg";
import LastPage from "../assets/last_icon.svg";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  pageNumber,
  firstPage,
  lastPage,
}: {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  pageNumber: number;
  firstPage: () => void;
  lastPage: () => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container mx-10 mb-8 mt-6">
      <ul className="pagination w-full justify-end items-baseline flex">
        <li className="me-10">
          <Typography variant="h6" color="black" className="font-bold">
            {"Page " +
              pageNumbers[pageNumber - 1] +
              " of " +
              pageNumbers[pageNumbers.length - 1]}
          </Typography>
        </li>
        <li>
          <IconButton
            className="h-10 w-10 justify-center items-center m-1  bg-white shadow-transparent"
            onClick={firstPage}
          >
            <img src={FirstPage} alt="double arrow icon" />
          </IconButton>
        </li>
        <li>
          <IconButton
            className="h-8 w-8 justify-center items-center m-1  bg-white shadow-transparent"
            onClick={previousPage}
          >
            <img src={PreviousPage} alt="arrow icon" />
          </IconButton>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <IconButton
              className="h-8 w-8 justify-center items-center m-1"
              color="blue-gray"
              variant="outlined"
              onClick={() => paginate(number)}
            >
              <Typography variant="small" color="black" className="font-serif">
                {number}
              </Typography>
            </IconButton>
          </li>
        ))}
        <li>
          <IconButton
            className="h-8 w-8 justify-center items-center m-1 bg-white shadow-transparent"
            onClick={nextPage}
          >
            <img src={NextPage} alt="arrow icon" />
          </IconButton>
        </li>
        <li>
          <IconButton
            className="h-10 w-10 justify-center items-center m-1 bg-white shadow-transparent"
            onClick={lastPage}
          >
            <img src={LastPage} alt="double arrow icon" />
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
