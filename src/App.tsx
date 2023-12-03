import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/adminUi";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import Table from "./components/Table";
import DeleteAllIcon from "./assets/delete_all_icon.svg";
import { Member } from "./types";

function App() {
  const [allMemberData, setAllMemberData] = useState<Member[] | null>(null);
  const [selectedIndicies, setSelectedIndicies] = useState(new Set<string>([]));
  const [inputText, setInputText] = useState("");

  const retrieveData = async () => {
    await api.get<Member[]>("/members.json").then((response) => {
      setAllMemberData(response.data);
    });
  };

  let inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const handleSelectionCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setSelectedIndicies((prevState) => {
        prevState.add(id);
        return prevState;
      });
    } else {
      setSelectedIndicies((prevState) => {
        prevState.delete(id);
        return prevState;
      });
    }
  };

  const handleMultiDelete = () => {
    setAllMemberData((prevState) => {
      prevState = (prevState ?? []).filter((member) => {
        return !selectedIndicies.has(member.id);
      });
      setSelectedIndicies(new Set<string>());
      return prevState;
    });
  };

  const handleSelectAllOnPage = (
    event: React.ChangeEvent<HTMLInputElement>,
    ids: string[]
  ) => {
    if (event.target.checked) {
      setSelectedIndicies(new Set(ids));
    } else {
      setSelectedIndicies(new Set<string>());
    }
  };

  return (
    <div>
      <Typography
        variant="h1"
        color="black"
        className="font-bold w-full text-center mt-6"
      >
        HireQuotient Assignment 2
      </Typography>
      <div className="mx-10 mt-4 flex items-stretch justify-between">
        <div className="w-96">
          <Input
            crossOrigin={undefined}
            onChange={inputHandler}
            variant="outlined"
            label="Search"
          />
        </div>
        <IconButton
          className="h-16 w-16 justify-center items-center self-end bg-red-400"
          onClick={handleMultiDelete}
        >
          <img src={DeleteAllIcon} alt="delete icon" />
        </IconButton>
      </div>
      {allMemberData ? (
        <Table
          key={`${allMemberData.length}-${selectedIndicies.size}`}
          input={inputText}
          data={allMemberData}
          selectedIndicies={selectedIndicies}
          handleSelectAllOnPage={handleSelectAllOnPage}
          onSelectionChange={handleSelectionCheckbox}
        />
      ) : null}
    </div>
  );
}

export default App;