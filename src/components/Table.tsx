import { useState } from "react";
import {
  Card,
  Typography,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";
import Pagination from "./Pagination";
import EditIcon from "../assets/edit_icon.svg";
import DeleteIcon from "../assets/delete_icon.svg";

const TABLE_HEAD = ["", "Name", "Email", "Role", "Actions"];

function List(props: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const [data, setData] = useState(props.data);
  const [editing, setEditing] = useState(false);

  const filteredData = data.filter((e: any) => {
    if (props.input === "") {
      return e;
    } else {
      return (
        e.name.toLowerCase().includes(props.input) ||
        e.email.toLowerCase().includes(props.input) ||
        e.role.toLowerCase().includes(props.input)
      );
    }
  });

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredData.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(filteredData.length / postsPerPage));
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const handleDelete = (id: number) => {
    const newData = data.filter((li: any) => li.id !== id);
    setData(newData);
  };

  const deleteMultiple = () => {
    let arrayIds: number[] = [];
    data.forEach((d: any) => {
      if (d.select) {
        arrayIds.push(d.state);
      }
    });
    console.log(arrayIds);
  };

  const handleEditing = () => {
    setEditing(true);
  };
  let viewMode: any = {};
  let editMode: any = {};
  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }
  const setNameUpdate = (updatedName: string, id: number) => {
    setData(
      data.map((d: any) => {
        if (d.id === id) {
          d.name = updatedName;
        }
        return d;
      })
    );
  };
  const setEmailUpdate = (updatedEmail: string, id: number) => {
    setData(
      data.map((d: any) => {
        if (d.id === id) {
          d.email = updatedEmail;
        }
        return d;
      })
    );
  };
  const setRoleUpdate = (updatedRole: string, id: number) => {
    setData(
      data.map((d: any) => {
        if (d.id === id) {
          d.role = updatedRole;
        }
        return d;
      })
    );
  };
  const handleUpdatedDone = (event: any) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  return (
    <div>
      <Card className="mx-10 my-4">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-6"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPosts
              ? currentPosts.map(
                  (
                    {
                      id,
                      name,
                      email,
                      role,
                    }: { id: any; name: any; email: any; role: any },
                    index: number,
                    selectState: boolean
                  ) => (
                    <tr key={id} className="even:bg-blue-gray-50/50">
                      <td className="w-20">
                        <Checkbox crossOrigin={undefined} />
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <div style={viewMode}>{name}</div>
                          <input
                            type="text"
                            value={name}
                            style={editMode}
                            onKeyDown={handleUpdatedDone}
                            onChange={(e) => setNameUpdate(e.target.value, id)}
                          />
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <div style={viewMode}>{email}</div>
                          <input
                            type="text"
                            value={email}
                            style={editMode}
                            onKeyDown={handleUpdatedDone}
                            onChange={(e) => setEmailUpdate(e.target.value, id)}
                          />
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          <div style={viewMode}>{role}</div>
                          <input
                            type="text"
                            value={role}
                            style={editMode}
                            onKeyDown={handleUpdatedDone}
                            onChange={(e) => setRoleUpdate(e.target.value, id)}
                          />
                        </Typography>
                      </td>
                      <td className="p-4 flex">
                        <IconButton
                          className="h-8 w-8 m-1 justify-center items-center bg-white"
                          onClick={handleEditing}
                        >
                          <img
                            className="object-contain h-4 w-4"
                            src={EditIcon}
                            alt="edit icon"
                          />
                        </IconButton>
                        <IconButton
                          className="h-8 w-8 m-1 justify-center items-center bg-white"
                          onClick={() => {}}
                        >
                          <img
                            className="object-contain h-4 w-4"
                            src={DeleteIcon}
                            alt="delete icon"
                            onClick={() => handleDelete(id)}
                          />
                        </IconButton>
                      </td>
                    </tr>
                  )
                )
              : null}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredData.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          pageNumber={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </Card>
    </div>
  );
}

export default List;
