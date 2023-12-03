import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/adminUi";
import { Input, IconButton } from "@material-tailwind/react";
import Table from "./components/Table";
import DeleteAllIcon from "./assets/delete_all_icon.svg";

function App() {
  const [data, setData] = useState<[] | null>(null);
  const [inputText, setInputText] = useState("");

  const retrieveData = async () => {
    await api.get("/members.json").then((data) => {
      let members = data.data;
      setData(
        members.map((d: any) => {
          return {
            id: d.id,
            name: d.name,
            email: d.email,
            role: d.role,
          };
        })
      );
    });
  };

  let inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="w-screen">
      <div className="mx-10 mt-4 w-full inline-flex items-center justify-between">
        <div className="w-96">
          <Input
            crossOrigin={undefined}
            onChange={inputHandler}
            variant="outlined"
            label="Search"
          />
        </div>
        <IconButton
          className="h-16 w-16 m-1 me-24 justify-center items-center bg-red-400"
          onClick={() => {}}
        >
          <img src={DeleteAllIcon} alt="delete icon" />
        </IconButton>
      </div>
      {data ? <Table input={inputText} data={data} /> : null}
    </div>
  );
}

export default App;
