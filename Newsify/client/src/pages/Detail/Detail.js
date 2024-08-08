import React, { useState, useEffect } from "react";
import "./Detail.scss";
import Navbar from "../../component/Navbar/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Footer from "../../component/Footer/Footer";
import Spinner from "../HomePage/Spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Detail(props) {
  const chartdata = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [6, 9],
        lebel: "Sentiments",
        backgroundColor: ["green", "red"],
        borderWidth: 2,
        borderColor: "Black",
      },
    ],
  };

  const [data, Setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const handleClick = () => {
    setSaved(true);
  };
  const [searchParams] = useSearchParams();
  const [artQuery, setArtQuery] = useState(
    searchParams.get("art") ? searchParams.get("art") : null
  );
  const fetchdata = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://amiteshpatel.pythonanywhere.com/search/ipl"
      );
      const datauser = await res.json();
      const dataaa = Object.values(datauser);
      for (var i = 0; i < dataaa.length; i++) {
        if (dataaa[i].id == artQuery) {
          console.log("heloo");
          Setdata(dataaa[i]);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchdata();
    console.log(data);
    // console.log(data.length);
  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <div class="card flex justify-center items-center m-4 shadow-xl outline-double">
        {loading && <Spinner />}
        <img
          src={data.images}
          class="card-img-top w-1/2 shadow-2xl my-1 rounded-lg"
          alt="news image"
        />
        <div class="card-body">
          <h5 class="card-title text-center font-bold text-2xl font-sans">
            {data.Headline}
          </h5>
          <p class="card-text font-medium text-base leading-7 tracking-wide	">
            {data.Article}
          </p>
          <p className="text-xl font-bold ">
            Sentiment :{" "}
            <span
              className="text-xl font-bold "
              style={{
                color:
                  data.Sentiment === "Positive"
                    ? "green"
                    : data.Sentiment === "negative"
                    ? "red"
                    : "grey",
              }}
            >
              {data.Sentiment}
            </span>
          </p>
          <p className="text-xl font-bold">
            TextClassification : {data.TextClassification}
          </p>
          <p className="text-xl font-bold">Fake/Real : {data.fakeorreal}</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
