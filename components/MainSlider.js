import React from 'react';
import { Link } from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SampleNextArrow = props => {
  const { onClick } = props;
  return (
    <>
    <div
      className="nextArrow"
      onClick={onClick}
    >
      <span className="nextIcon"></span>
    </div>
    <style jsx>{`
      .nextArrow{
          position: absolute;
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          top: 50%;
          background-color: lightGray;
          box-shadow: inset 2px 1px 3px rgba(0,0,0,.3);
          cursor: pointer;
        }
        @media only screen and (min-width: 875px) { 
          .prevArrow,.nextArrow{
            width: 80px;
            height: 80px;
          }
        }
        .nextArrow{
          right: 0;
          transform: translate(51%, -50%);
        }
        .nextIcon{
          position: absolute;
          width: 15px;
          height: 15px;
          border-right: 2px solid black;
          border-bottom: 2px solid black;
          left: 3px;
          top: 50%;
          transform: translateY(-50%) rotate(-45deg);
        }
        @media only screen and (min-width: 875px) { 
          .nextIcon{
            left: 12px;
          }
        }
    `}</style>
    </>
  );
}

const SamplePrevArrow = props => {
  const { onClick } = props;
  return (
    <>
    <div
      className="prevArrow"
      onClick={onClick}
    >
      <span className="prevIcon"></span>
    </div>
    <style jsx>{`
      .prevArrow{
        position: absolute;
        z-index: 1;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        top: 50%;
        background-color: lightGray;
        box-shadow: inset 2px 1px 3px rgba(0,0,0,.3);
        cursor: pointer;
      }
      @media only screen and (min-width: 875px) { 
        .prevArrow{
          width: 80px;
          height: 80px;
        }
      }
      .prevArrow{
        left: 0;
        transform: translate(-51%, -50%);
      }
      .prevIcon{
        position: absolute;
        width: 15px;
        height: 15px;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
        right: 3px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
      }
      @media only screen and (min-width: 875px) { 
        .prevIcon{
          right: 12px;
        }
      }
    `}</style>
    </>
  );
}

const MainSlider = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerModer: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: `slick-dots dots`,
  };


  return(
    <>
    <Slider {...settings} className="slider">
      {props.slides.map(slide => (
        <div key={slide.id}>
          {/* <Link className="postLink" href={`${slide.channelSlug}/${slide.slug}`}> */}
            <div className="imageContainer">
              <img src={slide.image} alt="text" className="sliderImage"/>
            </div>
            <h1 className="slideTitle">{slide.title}</h1>
          {/* </Link> */}
        </div>
      ))}
    </Slider> 
    <style jsx>{`
      .slider{
        position: relative;
        width: 100%;
        min-height: 56vw;
        overflow: hidden;
      }
      @media only screen and (min-width: 1024px) { 
        .slider{
          min-height: 573px;
        }
      }
      .postLink{
          text-decoration: none;
          color: black;
      }
      .imageContainer{
        position: relative;
        width: 100%;
        padding-top: 56%;
      }
      .sliderImage{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
      }
      .slideTitle{
        position: absolute;
        z-index: 50;
        bottom: 40px;
        padding: 10px 15px 10px 30px;
        background-color: lightGray;
        font-family: 'Helvetica Light';
        font-size: 18px;
      }  
      @media only screen and (min-width: 480px) { 
        .slideTitle{
          font-size: 30px;
        }
      }
    `}</style>
    <style global jsx>{`
      .slick-dots.dots{
        bottom: 10px;
      }
      .slick-dots.dots button:before{
        font-size: 15px;
        color: white;
        opacity: 1;
      }
      .slick-dot .slick-active button:before{
        font-size: 15px;
        opacity: 1;
      }
    `}
    </style>
    </>
  );

}

export default MainSlider;