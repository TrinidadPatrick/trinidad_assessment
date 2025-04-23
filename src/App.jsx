import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img6 from '../images/img6.webp'
import img7 from '../images/img7.webp'
import img8 from '../images/img8.webp'
import img10 from '../images/img10.webp'
import img11 from '../images/img11.webp'
import img12 from '../images/img12.webp'

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [currIndex, seCurrIndex] = useState(0);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      setOverlayVisible(!overlayVisible);
    };

    const responsive = {
        desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1
          }
    };

    const CustomDot = ({ onClick, ...rest }) => {
        const {
          onMove,
          index,
          active,
          carouselState: { currentSlide, deviceType }
        } = rest;
      
        // Images should correspond to your slides
        const thumbnails = [img6, img7, img8, img10, img11, img12];
      
        return (
          <li
            className={`inline-block mx-1 cursor-pointer border-2 ${
              active ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => onClick()}
          >
            <img
              src={thumbnails[index]}
              alt={`Thumbnail ${index + 1}`}
              className="w-12 h-12 object-cover"
            />
          </li>
        );
    };

    const images = [
        img6,
        img7,
        img8,
        img10,
        img11,
        img12
      ];
  
    return (
      <main className="flex flex-col items-center justify-start min-h-screen relative">
        {/* Overlay */}
        <div 
          id="overlay" 
          className={`fixed inset-0 bg-black opacity-50 z-40 ${overlayVisible ? 'block' : 'hidden'}`}
          onClick={toggleSidebar}
        ></div>
        
        {/* Navigation */}
        <nav className="flex flex-row sm:flex-col items-center justify-between w-full py-5 sm:py-0 relative">
          <div className="w-full flex sm:flex-col items-center px-7 sm:px-0">
            {/* Hamburger */}
            <button 
              id="hamburger" 
              className="lg:w-full sm:hidden w-fit h-full"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="#9B8379" fillRule="evenodd"
                  d="M0 3.75A.75.75 0 0 1 .75 3h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 3.75M0 8a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8m.75 3.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z"
                  clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Nav Items */}
            <div className="hidden sm:flex w-full justify-center items-start gap-10 md:gap-16 py-3 bg-[#FFF8F0] rounded">
              <a href="#" className="text-[#6A564F] text-sm md:text-base lg:text-lg whitespace-nowrap font-bold">Home</a>
              <a href="#" className="text-[#6A564F] text-sm md:text-base lg:text-lg whitespace-nowrap">Listings</a>
              <a href="#" className="text-[#6A564F] text-sm md:text-base lg:text-lg whitespace-nowrap">Let's Move</a>
              <a href="#" className="text-[#6A564F] text-sm md:text-base lg:text-lg whitespace-nowrap">About Us</a>
            </div>
            
            {/* Logo */}
            <div className="w-full flex justify-center lg:py-5">
              <img 
                className="w-[15rem] sm:w-[15rem] md:w-[20rem] lg:w-[20rem]" 
                src="./images/title_image.webp" 
                alt="Marci Metzeger Homes" 
              />
            </div>
          </div>
          <div className="w-[50px] aspect-square bg-white rotate-45 absolute -bottom-6 left-1/2 -translate-x-1/2 z-30"></div>
        </nav>
        
        {/* Mobile Sidebar */}
        <section>
          <div 
            id="sidebar"
            className={`w-[300px] h-[100svh] bg-[#f6f6f6] z-50 transform transition-transform duration-300 ease-in-out absolute top-0 left-0 flex flex-col justify-start items-center p-4 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Close button */}
            <button 
              id="closeButton" 
              className="lg:w-full sm:hidden w-full"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 12 12">
                <path fill="#9B8379"
                  d="M3.85 3.15a.5.5 0 0 0-.707.707l2.15 2.15l-2.15 2.15a.5.5 0 0 0 .707.707L6 6.714l2.15 2.15a.5.5 0 0 0 .707-.707l-2.15-2.15l2.15-2.15a.5.5 0 0 0-.707-.707L6 5.3z" />
              </svg>
            </button>
            
            {/* Mobile Nav Items */}
            <div className="flex flex-col items-start w-full justify-center gap-4 py-4 px-3">
              <a href="#" className="text-[#6A564F] text-base whitespace-nowrap font-bold">HOME</a>
              <a href="#" className="text-[#6A564F] text-base whitespace-nowrap">LISTINGS</a>
              <a href="#" className="text-[#6A564F] text-base whitespace-nowrap">LET'S MOVE</a>
              <a href="#" className="text-[#6A564F] text-base whitespace-nowrap">ABOUT US</a>
            </div>
          </div>
        </section>
  
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center md:justify-end py-10 w-full h-[70svh] sm:h-[80svh] bg-[#f6f6f6] bg-no-repeat bg-cover bg-fixed bg-center overflow-hidden">
          <div 
            id="img1" 
            className="absolute inset-0 bg-[url('https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg/:/rs=w:1534,m')] bg-cover bg-center bg-fixed filter brightness-40 z-0"
          ></div>
          <div className="flex flex-col gap-2 items-center">
            <h4 className="font1 text-xl text-white font-medium z-10 relative text-center">
              MARCI METZGER - 
              <span className="block sm:inline">THE RIDGE REALTY GROUP</span>
            </h4>
            <h2 className="font2 sm:w-fit text-4xl lg:text-6xl text-white font-medium z-10 relative text-center">PAHRUMP REALTOR</h2>
            <button className="font1 w-fit py-3 px-7 w-full sm:w-fit sm:text-base text-black bg-white rounded-full font-medium z-10 relative text-center shadow mt-2 sm:mt-0">
              CALL NOW
            </button>
          </div>
        </section>
        
        {/* About Section */}
        <section className="flex flex-col items-center justify-center w-full h-[80svh]  relative bg-no-repeat  bg-auto bg-center bg-black gap-10">
          <h2 className="font2 text-4xl text-white font-medium z-10 relative text-center">MARCI METZGER</h2>
          <div className="w-full flex justify-center">
            <img 
              src="./images/img2.webp" 
              alt="Marci Metzger" 
              className="aspect-square w-[20rem] lg:w-[23rem] rounded-full" 
            />
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font1 text-2xl text-white font-medium z-10 relative text-center">REALTOR FOR NEARLY 3 DECADES!</h4>
            <h4 className="font1 text-2xl text-white font-medium z-10 relative text-center">206-919-6886</h4>
          </div>
        </section>
  
        {/* Services Section */}
        <section className="w-full pb-[100px] pt-50px flex flex-col items-center">
          <div className="w-full py-10">
            <h2 className="font2 text-3xl text-center">GET IT SOLD</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 w-[95%] lg:w-[80%] xl:w-[70%]">
            <div className="">
              <img src="./images/img3.webp" alt="Marci Metzger" className="w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center xl:py-10 gap-5 lg:gap-10">
              <h1 className="font1 text-2xl text-center">Top Residential Sales Last 5 Years</h1>
              <div className="flex flex-col">
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  We helped nearly 90 clients in 2021, and closed 28.5 million in sales!
                </span>
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  Our team works hard everyday to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col justify-center xl:py-10 gap-5 lg:gap-10">
              <h1 className="font1 text-2xl text-center">Don't Just List it...</h1>
              <div className="flex flex-col">
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips
                </span>
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  of every possible buyer, getting you top dollar for your home.
                </span>
              </div>
            </div>
            
            <div className="">
              <img src="./images/img4.webp" alt="Marci Metzger" className="w-full" />
            </div>
            
            <div className="md:hidden flex flex-col justify-center xl:py-10 gap-5 lg:gap-10">
              <h1 className="font1 text-2xl text-center">Don't Just List it...</h1>
              <div className="flex flex-col">
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips
                </span>
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  of every possible buyer, getting you top dollar for your home.
                </span>
              </div>
            </div>
            
            <div className="">
              <img src="./images/img5.webp" alt="Marci Metzger" className="w-full" />
            </div>
            
            <div className="flex flex-col justify-center xl:py-10 gap-5 lg:gap-10">
              <h1 className="font1 text-2xl text-center">Guide to Buyers</h1>
              <div className="flex flex-col">
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  Nobody knows the market like we do. Enjoy having a pro at your service.
                </span>
                <span className="font1 text-[14px] xl:text-[16px] 2xl:text-lg font-normal text-center">
                  Market analysis, upgrades lists, contractors on speed dial, & more!
                </span>
              </div>
            </div>
          </div>
        </section>
  
        {/* Search Listings Section */}
        <section className="w-full lg:h-[65svh] relative flex flex-col justify-center items-center gap-0 md:gap-10 bg-black">
          {/* Image */}
          <div className="md:hidden w-full h-[150px] flex flex-col justify-center">
            <div 
              id="img_bot" 
              className="bg-[url('https://img1.wsimg.com/isteam/stock/143/:/rs=w:1535,m')] bg-bottom bg-no-repeat bg-cover w-full h-full absolute inset-0"
            ></div>
            <h1 className="font2 text-2xl md:hidden lg:text-4xl text-white font-medium z-10 relative text-center">
              FIND YOUR DREAM HOME
            </h1>
          </div>
          
          <div 
            id="img_bot" 
            className="w-full h-[90%] lg:h-[70%] md:bg-[url('https://img1.wsimg.com/isteam/stock/143/:/rs=w:1535,m')] absolute inset-0 bg-no-repeat object-cover bg-center bg-cover flex flex-col"
          ></div>
          
          <h1 className="font2 text-2xl hidden md:block lg:text-4xl text-white font-medium mt-8 lg:mt-0 z-10 relative text-center">
            FIND YOUR DREAM HOME
          </h1>
          
          {/* Search Form */}
          <div className="bg-white z-20 w-full md:w-[95%] lg:w-[1000px] xl:w-[1200px] p-5 lg:p-10 rounded">
            <h1 className="font2 text-2xl lg:text-3xl text-[#AB8585] text-start w-full mb-4 lg:mb-8">
              SEARCH LISTINGS
            </h1>
            
            <div className="w-full bg-white z-20 rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.4)] grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 justify-start items-center">
              {/* Location Select */}
              <div className="flex flex-col w-full relative">
                <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Location</label>
                <select className="border border-gray-300 outline-none h-[40px] rounded appearance-none cursor-pointer hover:border-[#AB8585]"></select>
                <svg className="top-9 right-2 absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                </svg>
              </div>
              
              {/* Type Select */}
              <div className="flex flex-col w-full relative">
                <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Type</label>
                <select className="border outline-none border-gray-300 h-[40px] rounded appearance-none cursor-pointer hover:border-[#AB8585]"></select>
                <svg className="top-9 right-2 absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                </svg>
              </div>
              
              {/* Sort By Select */}
              <div className="flex flex-col w-full relative">
                <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Sort By</label>
                <select className="border outline-none border-gray-300 h-[40px] rounded appearance-none cursor-pointer hover:border-[#AB8585]"></select>
                <svg className="top-9 right-2 absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                </svg>
              </div>
              
              {/* Bedrooms and Baths */}
              <div className="w-full flex gap-3">
                {/* Bedrooms */}
                <div className="flex flex-col w-full relative">
                  <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Bedrooms</label>
                  <select className="border outline-none border-gray-300 h-[40px] rounded appearance-none px-2 cursor-pointer text-gray-600 hover:border-[#AB8585]">
                    <option value="#">Any Number</option>
                    <option value="#">Studio</option>
                    <option value="#">1+</option>
                    <option value="#">2+</option>
                    <option value="#">3+</option>
                    <option value="#">4+</option>
                    <option value="#">5+</option>
                    <option value="#">6+</option>
                  </select>
                  <svg className="top-9 right-2 absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                  </svg>
                </div>
                
                {/* Baths */}
                <div className="flex flex-col w-full relative">
                  <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Baths</label>
                  <select className="border outline-none border-gray-300 h-[40px] rounded appearance-none px-2 cursor-pointer text-gray-600 hover:border-[#AB8585]">
                    <option value="#">Any Number</option>
                    <option value="#">Studio</option>
                    <option value="#">1+</option>
                    <option value="#">2+</option>
                    <option value="#">3+</option>
                    <option value="#">4+</option>
                    <option value="#">5+</option>
                    <option value="#">6+</option>
                  </select>
                  <svg className="top-9 right-2 absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                  </svg>
                </div>
              </div>
              
              {/* Price Range */}
              <div className="flex gap-3 w-full justify-center">
                {/* Min Price */}
                <div className="flex-1 flex-col relative w-full">
                  <label className="text-gray-500  font-normal mb-1 text-[14px] lg:text-sm">Min Price</label>
                  <div className="w-full">
                    <input type="text" className="border-b outline-none h-[40px] border-gray-300 appearance-none px-2 w-full" placeholder="$0.00" />
                  </div>
                </div>
                
                {/* Max Price */}
                <div className="flex-1 flex-col w-full relative">
                  <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Max Price</label>
                  <div className="w-full">
                    <input type="text" className="border-b outline-none h-[40px] border-gray-300 appearance-none px-2 w-full" placeholder="$0.00" />
                  </div>
                </div>
              </div>
              
              {/* Search Button */}
              <div className="flex flex-col w-full relative justify-end h-full">
                <button className="bg-[#AB8585] hover:bg-[#AB8585]/80 text-white rounded-full px-5 py-2 font1 w-full">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </section>
  
        {/* Logos Section */}
        <section className="w-full h-[30svh] bg-white flex flex-col justify-center items-center">
          <div className="w-full flex justify-evenly gap-10">
            <div className="w-[200px] flex justify-center items-center h-[200px]">
              <img 
                width="100" 
                src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/Equal%20Housing%20Logo.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:199,h:200,cg:true" 
                alt="Equal Housing Logo" 
              />
            </div>
            <div className="w-[200px] flex justify-center items-center h-[200px]">
              <img 
                width="100" 
                src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/BIG%20CIRCLE%202.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200" 
                alt="Logo" 
              />
            </div>
            <div className="w-[200px] flex justify-center items-center h-[200px]">
              <img 
                width="100" 
                src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/Realtor%20Pin.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:223,h:200,cg:true" 
                alt="Realtor Pin" 
              />
            </div>
            <div className="w-[200px] flex justify-center items-center h-[200px]">
              <img 
                width="100" 
                src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/Chamber.jpg/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200" 
                alt="Chamber Logo" 
              />
            </div>
          </div>
        </section>
  
        {/* Carousel Section */}
        <section className="w-full h-[100svh] bg-black flex flex-col justify-center items-center">
          <div className="w-[50%] aspect-video  flex gap-2 bg-white">
          {/* <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className="bg-red-100"
            containerClass="flex"
            customDot={<CustomDot />}
            dotListClass="mt-1"
            partialVisible={false}
            draggable
            focusOnSelect={false}
            infinite
            itemClass="flex-1"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
            renderDotsOutside
            >
            <div className=''>
                <img src={img6} alt="Image 1" className="w-full h-full object-cover" />
            </div>
            <div>
                <img src={img7} alt="Image 2" className="w-full h-full object-cover" />
            </div>
            <div>
                <img src={img8} alt="Image 3" className="w-full h-full object-cover" />
            </div>
            <div>
                <img src={img10} alt="Image 5" className="w-full h-full object-cover" />
            </div>
            <div>
                <img src={img11} alt="Image 6" className="w-full h-full object-cover" />
            </div>
            <div>
                <img src={img12} alt="Image 7" className="w-full h-full object-cover" />
            </div>
          </Carousel> */}
          <Carousel
            className="crsl bg-black"
            autoPlay
            infiniteLoop
            centerMode
            interval={1000}
            showStatus={false}
            onChange={(index) => seCurrIndex(index)}
            >
            {images.map((image, index) => (
                <div key={index} className='h-[500px] px-0.5 bg-black py-1'>
                    <img src={image} alt={image.author} className={`${currIndex == index ? '' : 'brightness-50'}`} />
                </div>
            ))}
            </Carousel>


          </div>
        </section>
      </main>
    );
}

export default App
