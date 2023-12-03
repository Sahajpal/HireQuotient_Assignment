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
import { Member } from "../types";

const TABLE_HEAD = ["Checkbox", "Name", "Email", "Role", "Actions"];

function Table(props: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [data, setData] = useState(props.data as Member[]);
  const [editing, setEditing] = useState({ index: null } as {
    index: number | null;
  });

  const filteredData = data.filter((e) => {
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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredData.length / membersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(filteredData.length / membersPerPage));
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMember = filteredData.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const handleDelete = (id: string) => {
    const newData = data.filter((li: any) => li.id !== id);
    setData(newData);
  };

  const handleEditing = (atIndex: number) => {
    if (editing.index) {
      setEditing({ index: null });
    } else {
      setEditing({ index: atIndex });
    }
  };

  const setNameUpdate = (updatedName: string, id: string) => {
    setData(
      data.map((d: any) => {
        if (d.id === id) {
          d.name = updatedName;
        }
        return d;
      })
    );
  };

  const setEmailUpdate = (updatedEmail: string, id: string) => {
    setData(
      data.map((d: any) => {
        if (d.id === id) {
          d.email = updatedEmail;
        }
        return d;
      })
    );
  };

  const setRoleUpdate = (updatedRole: string, id: string) => {
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
      setEditing({ index: null });
    }
  };

  return (
    <div>
      <Card className="mx-10 my-4">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) =>
                head === "Checkbox" ? (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-6"
                  >
                    <Checkbox
                      className="bg-white"
                      crossOrigin={undefined}
                      defaultChecked={(() => {
                        for (const post of currentMember) {
                          if (!props.selectedIndicies.has(post.id)) {
                            return false;
                          }
                        }
                        return true;
                      })()}
                      onChange={(event) => {
                        props.handleSelectAllOnPage(
                          event,
                          currentMember.map((p) => p.id)
                        );
                      }}
                    />
                  </th>
                ) : (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentMember
              ? currentMember.map(
                  ({ id, name, email, role }, index: number) => (
                    <tr key={id} className="border-b border-blue-gray-100">
                      <td className="w-20 ps-6">
                        <Checkbox
                          crossOrigin={undefined}
                          defaultChecked={props.selectedIndicies.has(id)}
                          onChange={(event) => {
                            props.onSelectionChange(event, id);
                          }}
                        />
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <div
                            style={{
                              display: editing.index === index ? "none" : "",
                            }}
                          >
                            {name}
                          </div>
                          <input
                            className="bg-gray-100 p-4"
                            type="text"
                            value={name}
                            style={{
                              display: editing.index === index ? "" : "none",
                            }}
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
                          <div
                            style={{
                              display: editing.index === index ? "none" : "",
                            }}
                          >
                            {email}
                          </div>
                          <input
                            className="bg-gray-100 p-4"
                            type="text"
                            value={email}
                            style={{
                              display: editing.index === index ? "" : "none",
                            }}
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
                          <div
                            style={{
                              display: editing.index === index ? "none" : "",
                            }}
                          >
                            {role}
                          </div>
                          <input
                            className="bg-gray-100 p-4"
                            type="text"
                            value={role}
                            style={{
                              display: editing.index === index ? "" : "none",
                            }}
                            onKeyDown={handleUpdatedDone}
                            onChange={(e) => setRoleUpdate(e.target.value, id)}
                          />
                        </Typography>
                      </td>
                      <td className="p-4 flex">
                        <IconButton
                          className="h-8 w-8 m-1 justify-center items-center bg-white"
                          onClick={() => {
                            handleEditing(index);
                          }}
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
          membersPerPage={membersPerPage}
          totalMembers={filteredData.length}
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

export default Table;
