import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Spreadsheet } from "react-spreadsheet";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../component/Card";

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");

  const backendBaseURL = "https://graceful-gabardine-ox.cyclic.app";

  const getData = async () => {
    const result = await fetch(
      backendBaseURL +
        "/getAll/" +
        name +
        "?date=" +
        startDate +
        "&withId=true",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setTableData(
      result?.map((item) => {
        return Object.values(item).map((d, i) => {
          if (name && i === 0) {
            return {
              value: (
                <button onClick={() => console.log("hello")}>Delete</button>
              ),
              label: d,
            };
          }

          if (dayjs(d).isValid()) {
            return {
              value: dayjs(d).format("DD/MM/YYYY"),
            };
          }
          return { value: d };
        });
      })
    );
  };

  const deleteEmail = async (id) => {
    const result = await fetch(backendBaseURL + "/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
        return res;
      })
      .catch((err) => console.log(err));

    console.log(result);
  };

  useEffect(() => {
    getData();
    if (name) {
      setColumnLabels([
        "Delete",
        "Email Date",
        "Platform",
        "Subject",
        "Student Email",
        "Email Type",
        "Assigned To",
        "Status",
      ]);
    } else {
      setColumnLabels([
        "Email Date",
        "Platform",
        "Subject",
        "Student Email",
        "Email Type",
        "Assigned To",
        "Status",
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const handleNameChange = (e) => {
    // localStorage.setItem("name", e.target.value)
    setName(e.target.value);
    console.log(e.target.value);
  };
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const [columnLabels, setColumnLabels] = useState([
    "Email Date",
    "Platform",
    "Subject",
    "Student Email",
    "Email Type",
    "Assigned To",
    "Status",
  ]);

  return (
    <div>
      <div className="top-container">
        <select style={{ padding: 10 }} onChange={handleNameChange}>
          <option value="">Select SME</option>
          <option value="Srujan Papaiahgari">Srujan Papaiahgari</option>
          <option value="Parag">Parag</option>
          <option value="Aman Kumar">Aman Kumar</option>
          <option value="Vidya Sagar">Vidya Sagar</option>
          <option value="Sukumar">Sukumar</option>
        </select>

        <div>
          <button
            onClick={() => {
              setStartDate(dayjs(startDate).subtract(1, "day").toDate());
            }}
          >
            &lt;
          </button>
          <DatePicker
            dateFormat={"dd/MM/yyyy"}
            selected={startDate}
            onChange={(date) => {
              console.log(date);
              setStartDate(date);
            }}
          />
          <button
            onClick={() => {
              setStartDate(dayjs(startDate).add(1, "day").toDate());
            }}
          >
            &gt;
          </button>
        </div>

        <button onClick={getData}>Refecth</button>

        {/* <button onClick={deleteData}>Delete All</button> */}
      </div>
      {!name && <RenderAnalytics tableData={tableData} />}
      <div className="sheet">
        <Spreadsheet
          darkMode
          data={tableData}
          columnLabels={columnLabels}
          onSelect={(selected) => {
            if (name && selected[0]?.column === 0) {
              const isDelete = window.confirm("Delete");
              if (isDelete) {
                const id = tableData[selected[0]?.row][0]?.label;
                deleteEmail(id);
              }
            }
          }}
          onChange={(e, h) => {
            console.log(e, h);
          }}
        />
      </div>
    </div>
  );
}

export function RenderAnalytics({ tableData }) {
  const smeNames = [
    "Srujan Papaiahgari",
    "Aman Kumar",
    "Parag",
    "Vidya Sagar",
    "Sukumar",
  ];

  function countRowsForName(name) {
    let count = 0;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][5].value === name) {
        count++;
      }
    }
    return {
      name,
      count,
    };
  }

  const result = smeNames.map((name) => countRowsForName(name));

  const maxCountObj = result.reduce((max, obj) => {
    return obj.count > max.count ? obj : max;
  });
  console.log(maxCountObj)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
      }}
    >
      {result?.map((data) => (
        <Card key={data?.name} {...data} maxCountObj={maxCountObj} />
      ))}
    </div>
  );
}
