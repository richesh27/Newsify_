import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cardsearch from "../../component/Cardsearch";
import "./Region.scss";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Spinner from "../HomePage/Spinner";

export default function Region() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = window.location.href
    .toString()
    .split("regionnews/")[1]
    .toUpperCase();
  var urlf = "";
  console.log(url);
  if (url == "WORLD") {
    urlf = "https://amiteshpatel.pythonanywhere.com/topic_wise/0";
  } else if (url == "LOCAL") {
    urlf = "https://amiteshpatel.pythonanywhere.com/local";
  } else {
    urlf = "https://amiteshpatel.pythonanywhere.com/topic_wise/1";
  }
  console.log(urlf);
  const fetchdata = async () => {
    setLoading(true);
    await fetch(urlf)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        const data = Object.values(res);
        var temp = [];

        for (let i = 0; i < data.length; i++) {
          temp.push(data[i]);
        }
        setPosts([...temp]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {}, [posts]);
  return (
    <div className="region">
      {/* <Navbar /> */}
      <h1 className="w3-xxxlarge d-flex align-items-center justify-center">{`${url} NEWS`}</h1>
      {loading && <Spinner />}
      {posts.map((i) => {
        return (
          <div
            className="card mb-3 m-5 mx-10 w3-border w3-border-black"
            style={{ height: "35%", width: "80%" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                {" "}
                <img src={i.images} style={{ height: "100%" }} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title w3-xlarge">{i.Headline}</h5>
                  <p className="card-text w3-large">
                    {i.summary?.slice(0, 240)}...
                  </p>
                  <p className="card-text">
                    <p className="text-xl font-bold ">
                      Sentiment :{" "}
                      <span
                        className="text-xl font-bold "
                        style={{
                          color:
                            i.Sentiment === "Positive"
                              ? "green"
                              : i.Sentiment === "negative"
                              ? "red"
                              : "grey",
                        }}
                      >
                        {i.Sentiment}
                      </span>
                    </p>
                    <p className="text-xl font-bold">
                      TextClassification : {i.TextClassification}
                    </p>
                    <p className="text-xl font-bold">Fake/Real : {i.fakeorreal}</p>
                    <Link to="/detail">
                      <button type="button" class="btn btn-primary card-btn">
                        Read More
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <Cardsearch/>
    <Cardsearch/>
    <Cardsearch/> */}
      <Footer />
    </div>
  );
}
