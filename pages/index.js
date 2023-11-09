import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Spreadsheet } from "react-spreadsheet";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SMES = ["Sanjay", "Aman Kumar", "Sukumar", "Yashraj"]

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");

  const backendBaseURL = "https://graceful-gabardine-ox.cyclic.app";

  const getData = async () => {
    const result = await fetch(backendBaseURL + "/getAll/" + name + "?date=" + startDate, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setTableData(
      result?.map((item) => {
        return Object.values(item).map((d, i) => {
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

  // const deleteData = async () => {
  //   const result = await fetch(backendBaseURL + "/deleteAll/" + name, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       getData();
  //       return res;
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const handleNameChange = (e) => {
    // localStorage.setItem("name", e.target.value)
    setName(e.target.value);
    console.log(e.target.value);
  };
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  return (
    <div>
      <div className="top-container">
        <select style={{ padding: 10 }} onChange={handleNameChange}>
          <option value="">Select SME</option>
          {
            SMES.map(sme => <option value={sme} key={sme}>{sme}</option>)
          }
          // <option value="Srujan Papaiahgari">Srujan Papaiahgari</option>
          // <option value="Parag">Parag</option>
          // <option value="Aman Kumar">Aman Kumar</option>
          // <option value="Vidya Sagar">Vidya Sagar</option>
          // <option value="Sukumar">Sukumar</option>
        </select>

        <div style={{display: "flex"}}>
          <button onClick={() => {
            setStartDate(dayjs(startDate).subtract(1, "day").toDate())
          }} >&lt;</button>
          <DatePicker
            dateFormat={"dd/MM/yyyy"}
            selected={startDate}
            onChange={(date) => {
              console.log(date)
              setStartDate(date);
            }}
          />
          <button onClick={() => {
            setStartDate(dayjs(startDate).add(1, "day").toDate())
          }} >&gt;</button>
        </div>

        <button onClick={getData}>Refecth</button>

        {/* <button onClick={deleteData}>Delete All</button> */}
      </div>
      <div className="sheet">
      <Spreadsheet darkMode data={tableData}  />
      </div>
    </div>
  );
}
