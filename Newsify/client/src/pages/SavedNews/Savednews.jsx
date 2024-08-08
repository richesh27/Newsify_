import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../component/Navbar/Navbar";
import CarouselComponent from "../HomePage/CarouselComponent"
import "../../component/Navbar/navbar.css";
import "../HomePage/Styles/carousel.css";
import "../SavedNews/savednews.css"
import Footer from "../../component/Footer/Footer";
import axios from "axios";
import backEndUrl from "../../host";
import { Link, useNavigate } from "react-router-dom";

// Toastify
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
import Spinner from "../HomePage/Spinner";
import { Context } from "../..";

const SavedNews = () => {
  const history = useNavigate();
  const {isAuthenticated, setIsAuthenticated}=useContext(Context);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  axios.get(`${backEndUrl}/saved`, { withCredentials: true }).then((res) => {
    // console.log(res);
    if (res.data.message === 'Login First') {
      history('/login');
    }
    setPosts([...res.data]);
    setLoading(false);
  })
  // useEffect(()=>{
  //   setIsAuthenticated(true);
  // })
  const handleClick = (i) => {

    axios
      .post(`${backEndUrl}/unbook`, { i }, { withCredentials: true })
      .then((res) => {
        if (res.data.message === "unbooked") {
          toast("Unsaved Successfully");
          history('/savednews');
        }
      })
      .catch((e) => {
        console.log(e);
      });

  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="mb-5">
        {loading && <Spinner />}
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          loop={true}
          navigation={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              centeredSlides: true,
            },
            400: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: true,
            },
            500: {
              slidesPerView: 1,
              spaceBetween: 30,
              centeredSlides: true,
            },
            600: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: -20,
            },
          }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={30}
        >
          {
            <>
              {/* <Card data={posts} /> */}
              {/* {posts.Headline} */}

               {posts.map((i) => {
                return (
                  <SwiperSlide>
                    <div
                      class="card carousel-card carousel-card"
                      style={{ width: "90%", height: "39rem" }}
                    >
                      <img
                        src={i.images}
                        class="card-img-top card-image"
                        alt="..."
                        style={{ width: "100%", height: "20rem" }}
                      />
                      <div class="card-body">
                        <div className="d-flex justify-space-between align-items-left flex-row">
                          <div>
                            <h5 class="card-title carousel-title">
                              {i.Headline}
                            </h5>
                          </div>
                          <div>
                            <button onClick={() => handleClick(i)}>
                              <i
                                className={`fa-solid fa-floppy-disk fa-xl ml-2`}
                                style={{ color: " #af695c" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                        <p class="card-text">{i.summary?.slice(0, 240)}...</p>
                        <p className="text-lg font-bold " >
                          Sentiment : <span className="text-lg font-bold " style={{ color: i.Sentiment === 'Positive' ? 'green' : (i.Sentiment === 'negative' ? 'red' : 'grey') }}>{i.Sentiment}</span>
                        </p>
                        <p className="text-lg font-bold">
                          TextClassification : {i.TextClassification}
                        </p>
                        <p className="text-lg font-bold">Fake/Real : {i.fakeorreal}</p>

                        <Link to={`/detail?art=${i.id}`}>
                          <button type="button" class="btn btn-primary card-btn">
                            Read More
                            <img src="circle-notch.png" className="notch" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          }
          <ToastContainer />
        </Swiper>
      </div>

      <Footer />
    </>
  );
};

export default SavedNews;
