import Slider from "react-slick";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

// Example images (replace with your actual images)
import img1 from "../assets/slider-img/img-1.webp";
import img2 from "../assets/slider-img/img-2.jpg";
import img3 from "../assets/slider-img/img-3.jpg";
import img4 from "../assets/slider-img/img-4.jpg";
import img5 from "../assets/slider-img/img-5.jpg";
import img6 from "../assets/slider-img/img-6.jpg";
import img7 from "../assets/slider-img/img-7.jpg";
import img8 from "../assets/slider-img/img-8.jpg";

// Custom arrow components for the slider
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-100 p-2 md:p-5 rounded-full"
      onClick={onClick}
    >
      <AiOutlineRight size={24} className="text-gray-500 hover:text-gray-700" />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-100 p-2 md:p-5 rounded-full"
      onClick={onClick}
    >
      <AiOutlineLeft size={24} className="text-gray-500 hover:text-gray-700" />
    </div>
  );
}

export default function Hero() {
  // Slider settings
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-2 h-2 bg-gray-400 rounded-full mt-4"></div>
    ),
  };

  // Example images for the slider
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div className="relative mx-auto w-full md:w-[100%] bg-gray-100 ">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`slide-${index}`}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
            <div className="absolute top-[30%] left-4 md:left-8 text-white">
              <h1 className="text-2xl md:text-4xl font-bold">MIN. 50% OFF</h1>
              <p className="text-sm md:text-lg">Extra 10% off on breezy trends</p>
              {/* Hide the button on small screens */}
              <button className="mt-4 bg-white text-black px-4 py-2 font-bold rounded-full hover:bg-gray-200 hidden md:inline-block">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
