import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';

export type Data = {
  id: number;
  name: string;
  email: string;
  role: string;
};

function App() {
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {data
        ? data.map((single) => {
            return <p>{single.id + " " + single.name + " " + single.email + " " + single.role}</p>;
          })
        : null}
    </div>
  );
}

export default App;
