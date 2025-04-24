import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img6 from '../images/img6.webp'
import img7 from '../images/img7.webp'
import img8 from '../images/img8.webp'
import img10 from '../images/img10.webp'
import img11 from '../images/img11.webp'
import img12 from '../images/img12.webp'
import img13 from '../images/img13.webp'
import img14 from '../images/img14.webp'
import img15 from '../images/img15.webp'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [currIndex, seCurrIndex] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [showOpenDates, setShowOpenDates] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    const customIcon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      shadowSize: [41, 41]
    });

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
      
      // Cleanup on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openGoogleMaps = () => {
      const [lat, lng] = position;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, "_blank");
    };
    
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      setOverlayVisible(!overlayVisible);
    };

    useEffect(() => {
      if (contentRef.current) {
        if (showOpenDates) {
          setHeight(contentRef.current.scrollHeight);
        } else {
          setHeight(0);
        }
      }
    }, [showOpenDates]);


    const images = [
        img6,
        img7,
        img8,
        img10,
        img11,
        img12
    ];

    const position = [36.1842212, -116.0376543];
  
    return (
      <main className="flex flex-col items-center justify-start min-h-screen relative bg-[#faf9f7] sm:bg-[#1a1a1b]">
        {/* Overlay */}
        <div 
          id="overlay" 
          className={`fixed inset-0 bg-black opacity-50 z-40 ${overlayVisible ? 'block' : 'hidden'}`}
          onClick={toggleSidebar}
        ></div>
        
        {/* Navigation */}
        <nav className="flex bg-[#faf9f7] flex-row sm:flex-col items-center justify-between w-full py-5 sm:py-0 relative">
          <div className="w-full flex sm:flex-row-reverse items-center px-7 sm:px-0">
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
            <div className="hidden flex-1 sm:flex w-full justify-end pe-10 md:pe-16 items-start lg:gap-10 gap-3 md:gap-5 py-3 bg-[#faf9f7] rounded">
              <a href="#" className="text-[#6A564F] text-[13px] md:text-base border-b-2  whitespace-nowrap font-bold">Home</a>
              <a href="#" className="text-[#6A564F] text-[13px] md:text-base  whitespace-nowrap">Listings</a>
              <a href="#" className="text-[#6A564F] text-[13px] md:text-base  whitespace-nowrap">Let's Move</a>
              <a href="#" className="text-[#6A564F] text-[13px] md:text-base  whitespace-nowrap">About Us</a>
            </div>
            
            {/* Logo */}
            <div className="flex-1 flex justify-center sm:justify-start lg:py-3">
              <img 
                className="w-[15rem] sm:w-[12rem] md:w-[15rem] z-50 mx-10 md:mx-16" 
                src="./images/title_image.webp" 
                alt="Marci Metzeger Homes" 
              />
            </div>
          </div>
          <div className="w-[40px] md:w-[50px] aspect-square bg-[#faf9f7] rotate-45 absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 z-30"></div>
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
        <section className="relative flex flex-col items-center justify-center md:justify-center gap-10 py-10 w-full h-[70svh] sm:h-[80svh] bg-[#f6f6f6] bg-no-repeat bg-cover bg-fixed bg-center overflow-hidden">
          <div id="img1" className="absolute inset-0 bg-[url('https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg/:/rs=w:1534,m')] bg-cover bg-center bg-fixed filter brightness-40 z-0"></div>
          {/* <div className='w-full flex justify-center z-20'>
            <img src="./images/title_img_inv.png" alt='title' className='z-40 w-[600px]' />
          </div> */}
          <div className="flex flex-col gap-2 items-center">
            <h4 className="font1 text-xl text-white font-medium z-10 relative text-center">
              MARCI METZGER - 
              <span className="block sm:inline">THE RIDGE REALTY GROUP</span>
            </h4>
            <h2 className="font2 sm:w-fit text-4xl lg:text-6xl text-white font-medium z-10 relative text-center">PAHRUMP REALTOR</h2>
            <button className="font1 py-3 px-7 w-full sm:w-fit cursor-pointer hover:bg-[#faf9f7]/80 sm:text-base text-black bg-[#faf9f7] rounded-full font-medium z-10 relative text-center shadow mt-2 sm:mt-0">
              CALL NOW
            </button>
          </div>
        </section>
        
        {/* About Section */}
        <section className="flex flex-col items-center justify-center w-full h-full py-10 relative bg-no-repeat  bg-auto bg-center bg-[#1a1a1b] gap-10">
          <h2 className="font2 text-4xl text-white font-medium z-10 relative text-center">MARCI METZGER</h2>
          <div className="w-full flex justify-center">
            <img 
              src="./images/img2.webp" 
              alt="Marci Metzger" 
              className="aspect-square w-[20rem] lg:w-[23rem] rounded-[50%] border-4 border-[#444]" 
            />
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font1 text-2xl text-white font-medium z-10 relative text-center">REALTOR FOR NEARLY 3 DECADES!</h4>
            <h4 className="font1 text-2xl text-white font-medium z-10 relative text-center">206-919-6886</h4>
          </div>
        </section>
  
        {/* Services Section */}
        <section className="relative w-full pb-[100px] bg-[#faf9f7] md:pt-[30px] flex flex-col items-center overflow-hidden">
        {/* Soft Background Blobs */}
        <div className="absolute top-[-60px] left-[-80px] w-[200px] h-[200px] bg-gradient-to-br from-[#e7d7cd] to-transparent rounded-full opacity-30 blur-2xl z-0" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[250px] h-[250px] bg-gradient-to-tr from-[#e7d7cd] to-transparent rounded-full opacity-30 blur-2xl z-0" />

        <div className="w-full py-10 relative z-10  flex justify-center md:mb-10">
          <h2 className="font2 text-[#6A564F] text-3xl lg:text-4xl text-center border-b-4 border-[#d4bba6] inline-block pb-2">
            GET IT SOLD
          </h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 w-[95%] lg:w-[80%] xl:w-[70%]">
          
          {/* Image */}
          <div className="overflow-hidden flex rounded-xl shadow-md group">
            <img src="./images/img3.webp" alt="Marci Metzger" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>

          {/* Text Block */}
          <div className="flex flex-col justify-center xl:py-10 gap-5 lg:gap-10 text-center">
            <h1 className="font1 text-2xl border-b-2 border-[#d4bba6] inline-block mx-auto pb-1">
              Top Residential Sales Last 5 Years
            </h1>
            <div className="flex flex-col gap-3 text-[#444]">
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                We helped nearly <strong>90 clients</strong> in 2021, and closed <strong>$28.5M</strong> in sales!
              </span>
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                Our team works hard every day to grow and learn so that we may continue to excel in our market. Our clients deserve our best, and we strive to make sure our best gets better every year.
              </span>
            </div>
          </div>

          {/* Desktop Only Text Block */}
          <div className="hidden md:flex flex-col justify-center xl:py-10 gap-5 lg:gap-10 text-center">
            <h1 className="font1 text-2xl border-b-2 border-[#d4bba6] inline-block mx-auto pb-1">
              Don't Just List it...
            </h1>
            <div className="flex flex-col gap-3 text-[#444]">
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips
              </span>
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                of every possible buyer, getting you top dollar for your home.
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-xl shadow-md group">
            <img src="./images/img4.webp" alt="Marci Metzger" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>

          {/* Mobile Only Text Block */}
          <div className="md:hidden flex flex-col justify-center xl:py-10 gap-5 lg:gap-10 text-center">
            <h1 className="font1 text-2xl border-b-2 border-[#d4bba6] inline-block mx-auto pb-1">
              Don't Just List it...
            </h1>
            <div className="flex flex-col gap-3 text-[#444]">
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips
              </span>
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                of every possible buyer, getting you top dollar for your home.
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-xl shadow-md group">
            <img src="./images/img5.webp" alt="Marci Metzger" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>

          {/* Final Text Block */}
          <div className="flex flex-col justify-center xl:py-10 gap-5 lg:gap-10 text-center">
            <h1 className="font1 text-2xl border-b-2 border-[#d4bba6] inline-block mx-auto pb-1">
              Guide to Buyers
            </h1>
            <div className="flex flex-col gap-3 text-[#444]">
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                Nobody knows the market like we do. Enjoy having a pro at your service.
              </span>
              <span className="font1 text-sm xl:text-base 2xl:text-lg">
                Market analysis, upgrade lists, contractors on speed dial, & more!
              </span>
            </div>
          </div>
        </div>
        </section>
  
        {/* Search Listings Section */}
        <section className="pb-0 w-full h-[75svh] md:h-[100svh] xl:h-[75svh] border-b-0 border-gray-100 md:border-b-0 sm:border-black relative flex flex-col justify-center items-center gap-0 md:gap-10 bg-[#1a1a1b">
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
            className="w-full h-[90%] lg:h-[80%] md:bg-[url('https://img1.wsimg.com/isteam/stock/143/:/rs=w:1535,m')] absolute inset-0 bg-no-repeat object-cover bg-center bg-cover flex flex-col"
          ></div>
          
          <h1 className="font2 text-2xl hidden md:block lg:text-4xl text-white font-medium mt-8 xl:mt-12 xl:mb-8 z-10 relative text-center">
            FIND YOUR DREAM HOME
          </h1>
          
          {/* Search Form */}
          <div className="bg-[#faf9f7] h-fit shadow-[0_0_30px_rgba(255,255,255,0.2)] z-20 w-full md:w-[95%] lg:w-[1000px] xl:w-[1200px] p-5 lg:px-12 lg:py-14 md:rounded">
            <h1 className="font2 text-2xl lg:text-3xl text-[#6A564F] text-start w-full mb-4 lg:mb-8">
              SEARCH LISTINGS
            </h1>
            
            <div className="w-full bg-[#faf9f7] z-20 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 justify-start items-center">
              {/* Location Select */}
              <div className="flex flex-col w-full relative">
                <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Location</label>
                <select className="border border-gray-300 outline-none h-[40px] rounded appearance-none cursor-pointer hover:border-[#AB8585]"></select>
                <svg className="top-9 right-2 absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                </svg>
              </div>
              
              {/* Type Select */}
              <div className="flex flex-col w-full relative">
                <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Type</label>
                <select className="border outline-none border-gray-300 h-[40px] rounded appearance-none cursor-pointer hover:border-[#AB8585]"></select>
                <svg className="top-9 right-2 absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/>
                </svg>
              </div>
              
              {/* Sort By Select */}
              <div className="flex flex-col w-full relative">
                <label className="text-gray-500 font-normal mb-1 text-[14px] lg:text-sm">Sort By</label>
                <select className="border outline-none border-gray-300 h-[40px] rounded appearance-none cursor-pointer hover:border-[#AB8585]"></select>
                <svg className="top-9 right-2 absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
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
                  <svg className="top-9 right-2 absolute select-none cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
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
                  <svg className="top-9 right-2 absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
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
                <button className="bg-[#6A564F] hover:bg-[#6A564F]/80 text-white rounded-full px-5 py-4 mt-1 md:mt-0 md:py-2 font1 w-full cursor-pointer">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className='w-full h-[5svh] xl:h-[5svh] hidden md:block bg-[#1a1a1b'></div>

        {/* Logos Section */}
        <section className="w-full h-[30svh] sm:h-[35svh] md:h-[35svh] lg:h-[45svh] xl:h-[50svh] bg-[#1b1b1c]  flex flex-col justify-center items-center">
          <div className=" w-full bg-[#faf9f7] py-10 h-full flex flex-col justify-center">
          <div className="w-full flex justify-center md:justify-evenly gap-10 mt-10 sm:mt-0">
          <div className="w-[60px] sm:w-[80px] lg:w-[150px] aspect-square rounded-full flex justify-center items-center 
                bg-gradient-to-br from-[#6A564F] via-[#a88f83] to-[#6A564F] p-[2px] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center">
            <img 
              className="object-cover w-[85%] rounded-full" 
              src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/BIG%20CIRCLE%202.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200" 
              alt="Logo" 
            />
          </div>
        </div>
        {/* Equal Housing Logo */}
        <div className="w-[60px] sm:w-[80px] lg:w-[150px] aspect-square rounded-full flex justify-center items-center 
                        bg-gradient-to-br from-[#6A564F] via-[#a88f83] to-[#6A564F] p-[2px] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center">
            <img 
              className="object-cover w-[65%]" 
              src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/Equal%20Housing%20Logo.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:199,h:200,cg:true" 
              alt="Equal Housing Logo" 
            />
          </div>
        </div>

        {/* Realtor Pin */}
        <div className="w-[60px] sm:w-[80px] lg:w-[150px] aspect-square rounded-full flex justify-center items-center 
                        bg-gradient-to-br from-[#6A564F] via-[#a88f83] to-[#6A564F] p-[2px] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center">
            <img 
              className="object-cover w-[75%]" 
              src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/Realtor%20Pin.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:223,h:200,cg:true" 
              alt="Realtor Pin" 
            />
          </div>
        </div>

        {/* Chamber Logo */}
        <div className="w-[60px] sm:w-[80px] lg:w-[150px] aspect-square rounded-full flex justify-center items-center 
                        bg-gradient-to-br from-[#6A564F] via-[#a88f83] to-[#6A564F] p-[2px] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center">
            <img 
              className="object-cover w-[65%]" 
              src="https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/Chamber.jpg/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200" 
              alt="Chamber Logo" 
            />
          </div>
        </div>

          </div>
          </div>
        </section>
  
        {/* Carousel Section */}
        <section className="w-full h-fit bg-[#1a1a1b] flex flex-col md:gap-10 justify-between py-2 md:py-10 items-center">
          {/* <div className="w-[50%] aspect-video bg-red-100 flex gap-2 "> */}
          <div className='w-full py-4'>
            <h2 className=' text-3xl md:text-5xl text-center font2 text-white'>Photo Gallery</h2>
          </div>
          <Carousel
            className="crsl bg-[#1a1a1b] w-[80%] aspect-video"
            autoPlay
            infiniteLoop
            showThumbs={width < 768 ? false : true}
            centerMode={true}
            showIndicators={false}
            interval={3000}
            showStatus={false}
            swipeable
            emulateTouch
            onChange={(index) => seCurrIndex(index)}
            >
            {images.map((image, index) => (
                <div draggable={false} key={index} className=' px-0.5 bg-[#1a1a1b] py-1 cursor-pointer select-none'>
                    <img draggable={false} src={image} alt={image.author} className={`${currIndex == index ? '' : 'brightness-50'} select-none size-2/3`} />
                </div>
            ))}
          </Carousel>


          {/* </div> */}
        </section>

        {/* Services Section */}
        <section className='w-fullh-fit bg-[#faf9f7] px-12 py-20 flex flex-col gap-10 items-center'>
          <div className='w-full py-4'>
            <h2 className='text-3xl md:text-5xl text-center font2 text-[#6A564F]'>Our Services</h2>
          </div>
          {/* Card Container */}
          <div className='w-full xl:w-[90%] h-full grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative'>
            {[img13, img14, img15].map((img, idx) => {
              const titles = [
                "Real Estate Done Right",
                "Commercial & Residential",
                "Rely on Expertise",
              ];
              const texts = [
                "Nervous about your property adventure? Don’t be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!",
                "Large or small, condo or mansion, we can find it and get at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put you hard-earned dollars.",
                "If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way."
              ];
              return (
                <div
                  key={idx}
                  className='group cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 hover:z-10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] bg-[#faf9f7] rounded shadow flex flex-col gap-7 justify-start items-center p-10 hover:translate-y-[-20px]'
                >
                  <div className='w-full flex justify-center'>
                    <img src={img} alt='image' className='object-cover aspect-square w-full rounded shadow' />
                  </div>
                  <div className='w-full'>
                    <h2 className='font1 text-gray-800 font-semibold text-lg xl:text-xl text-center'>{titles[idx]}</h2>
                  </div>
                  <div className='w-full'>
                    <p className='font1 text-center text-sm xl:text-base'>{texts[idx]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Socials Section */}
        <section className='w-full h-[25svh] bg-[#1a1a1b] flex gap-10 items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="white" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="white" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="white" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" d="m4.98 11.264l4.701 2.278a1.075 1.075 0 0 1 .6 1.074a1.07 1.07 0 0 1-.81.927L4.393 16.8a1.09 1.09 0 0 1-1.187-.492a1.1 1.1 0 0 1-.146-.429a9.2 9.2 0 0 1 .424-3.996a1.07 1.07 0 0 1 .606-.645a1.1 1.1 0 0 1 .888.026m1.884 9.615l3.5-3.861a1.08 1.08 0 0 1 1.205-.277a1.08 1.08 0 0 1 .673 1.03l-.183 5.195a1.07 1.07 0 0 1-.396.793a1.08 1.08 0 0 1-.861.226a9.4 9.4 0 0 1-3.748-1.506a1.07 1.07 0 0 1-.46-.758a1.07 1.07 0 0 1 .27-.842m8.298-5.139l4.975 1.606a1.08 1.08 0 0 1 .657.596a1.06 1.06 0 0 1-.017.884a9.3 9.3 0 0 1-2.487 3.166a1.082 1.082 0 0 1-1.602-.258l-2.773-4.408a1.065 1.065 0 0 1 .065-1.226a1.08 1.08 0 0 1 1.182-.36m5.059-3.152l-5.029 1.433a1.085 1.085 0 0 1-1.169-.4A1.065 1.065 0 0 1 14 12.393l2.926-4.308a1.08 1.08 0 0 1 .755-.464a1.1 1.1 0 0 1 .85.257a9.2 9.2 0 0 1 2.379 3.25a1.07 1.07 0 0 1-.691 1.46M8.469.468a15 15 0 0 0-2.585.946a1.08 1.08 0 0 0-.564.65a1.06 1.06 0 0 0 .097.851l4.915 8.456a1.076 1.076 0 0 0 1.212.499a1.066 1.066 0 0 0 .799-1.034V1.072A1.065 1.065 0 0 0 11.622.06a1.1 1.1 0 0 0-.437-.057c-.918.072-1.826.228-2.715.465" clipRule="evenodd"/></svg>
        </section>

        {/* Contact Us Section */} 
        <section className='w-full h-fit bg-[#faf9f7] flex-col gap-10 items-center justify-start py-10'>
          <div className='w-full py-4'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font2 text-[#6A564F]'>Call or Visit</h2>
            </div>
            <div className=" bg-[#faf9f7] p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Contact Info */}
            <div className=" h-fit space-y-6">


              <div className="flex items-center space-x-2 text-gray-700">
                <h1 className='font1 text-2xl font-bold text-[#6A564F]'>Marci Metzger - THE RIDGE REALTY GROUP</h1>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#6A564F" strokeLinejoin="round" strokeWidth="2"><path d="M6.4 4.76a7.92 7.92 0 0 1 11.2 11.2l-4.186 4.186a2 2 0 0 1-2.828 0L6.4 15.96a7.92 7.92 0 0 1 0-11.2Z"/><circle cx="12" cy="10.36" r="3" strokeLinecap="round"/></g></svg>
                <div>
                  <p>3190 HW-160, Suite F, Pahrump, Nevada 89048, United States</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#6A564F" d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75zM7.5 3H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1c-1.24 0-2.45-.2-3.57-.57a.8.8 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.15 15.15 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.4 11.4 0 0 1 8.5 4c0-.55-.45-1-1-1"/></svg>
                <span>(206) 919-6886</span>
              </div>

              <div className="flex flex-col items-center text-gray-700 mt-10 gap-2">
                  <div className='w-full'>
                    <p className='font1 text-2xl'>Office Hours</p>
                  </div>

                  <div onClick={()=>setShowOpenDates(!showOpenDates)} className='w-full cursor-pointer flex gap-2 items-center'>
                    <p className='font1 cursor-pointer text-lg text-start'>Open Today </p>
                    <p className='font1 cursor-pointer text-lg text-start text-[#6A564F]/80'>08:00 AM - 07:00 PM</p>
                    <button className='text-[#6A564F]/80 cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"/></g></svg>
                    </button>
                  </div>
                  <li style={{height}} className='w-full transition-[height] overflow-hidden duration-300 ease-in-out bg-[#faf9f7] flex flex-col items-start gap-2'>
                    <div ref={contentRef} className='flex flex-col gap-1'>
                    {
                      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                        const isToday = String(new Date()).split(" ")[0] === day;
                        return (
                          <ul key={idx} className={`font1 ${isToday && 'font-bold'} cursor-pointer text-base text-start`}>{day} 08:00 a.m. – 07:00 p.m. </ul>
                        )
                      })
                    }    
                    </div>
                  </li>
                  <div className='w-full'>
                    <p className='font1'>Open daily 8:00 am - 7:00 pm</p>
                  </div>
                  <div className='w-full'>
                    <p className='font1'>Appointments outside office hours available upon request. Just call!</p>
                  </div>
              </div>

            </div>

            {/* Right Form Section */}
            <div className="h-fit  space-y-6">
              <div className="grid grid-cols-1 gap-4 relative">
                <input
                id='name'
                name='name' type="text" placeholder=" " className="peer border border-[#6A564F]/80 focus:border-2 focus:border-[#6A564F] p-2 rounded w-full"/>
                <label htmlFor="name" className={`
                absolute left-2 text-[#6A564F]/80 bg-[#faf9f7] px-1 font1 text-sm 
                transition-all duration-200 
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-[#6A564F]/50
                peer-focus:-top-2.5
                peer-focus:text-sm 
                peer-focus:text-[#6A564F]
                cursor-text
              `}>Name</label>
              </div>

              <div className="grid grid-cols-1 gap-4 relative">
                <input
                id='email'
                name='email' type="email" placeholder=" " className="peer border border-[#6A564F]/80 focus:border-2 focus:border-[#6A564F] p-2 rounded w-full"/>
                <label htmlFor="email" className={`
                absolute left-2 text-[#6A564F]/80 bg-[#faf9f7] px-1 font1 text-sm 
                transition-all duration-200 
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-[#6A564F]/50
                peer-focus:-top-2.5
                peer-focus:text-sm 
                peer-focus:text-[#6A564F]
                cursor-text
              `}>Email</label>
              </div>

              <div className="relative w-full">
              <textarea
                id="message"
                placeholder=" "
                className="peer border border-[#6A564F]/80 focus:border-[#6A564F] focus:border-2 p-3 pt-6 rounded w-full h-32 resize-none placeholder-transparent transition-all"
              />
              <label
              htmlFor="message"
              className={`
                absolute left-2 top-3 text-[#6A564F]/80 bg-[#faf9f7] px-1 font1 text-sm 
                transition-all duration-200
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-[#6A564F]/50
                peer-focus:-top-2.5
                peer-focus:text-sm
                peer-focus:text-[#6A564F]
                cursor-text
              `}>
              Message
              </label>
          </div>

              <button type="submit" className="bg-[#6A564F] hover:bg-[#6A564F]/80 cursor-pointer text-white py-2 px-6 rounded-md">
                Submit
              </button>
            </div>
          </div>
          <div>
            <p className='font1 text-center text-gray-500 text-sm'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[60svh] relative">
        <button onClick={openGoogleMaps} className="absolute top-5 cursor-pointer left-16 z-[99999999999] bg-[#faf9f7] text-black font-medium py-2 px-4 rounded-full shadow-md hover:bg-gray-100">
        Get Directions
        </button>
        <MapContainer className='z-20 relative' scrollWheelZoom={false} touchZoom={false} center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker draggable position={position} icon={customIcon}>
            <Popup>Pahrump, NV</Popup>
          </Marker>
        </MapContainer>
        </section>

        {/* Footer */}
        <section className='w-full h-[25svh] md:h-[35svh] bg-[#1a1a1b] flex flex-col gap-10 items-center justify-center relative'>
        <div className="w-[35px] md:w-[50px] aspect-square bg-[#1a1a1b] rotate-45 absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 z-30"></div>
          <div className='flex gap-10 items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="white" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="white" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="white" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" d="m4.98 11.264l4.701 2.278a1.075 1.075 0 0 1 .6 1.074a1.07 1.07 0 0 1-.81.927L4.393 16.8a1.09 1.09 0 0 1-1.187-.492a1.1 1.1 0 0 1-.146-.429a9.2 9.2 0 0 1 .424-3.996a1.07 1.07 0 0 1 .606-.645a1.1 1.1 0 0 1 .888.026m1.884 9.615l3.5-3.861a1.08 1.08 0 0 1 1.205-.277a1.08 1.08 0 0 1 .673 1.03l-.183 5.195a1.07 1.07 0 0 1-.396.793a1.08 1.08 0 0 1-.861.226a9.4 9.4 0 0 1-3.748-1.506a1.07 1.07 0 0 1-.46-.758a1.07 1.07 0 0 1 .27-.842m8.298-5.139l4.975 1.606a1.08 1.08 0 0 1 .657.596a1.06 1.06 0 0 1-.017.884a9.3 9.3 0 0 1-2.487 3.166a1.082 1.082 0 0 1-1.602-.258l-2.773-4.408a1.065 1.065 0 0 1 .065-1.226a1.08 1.08 0 0 1 1.182-.36m5.059-3.152l-5.029 1.433a1.085 1.085 0 0 1-1.169-.4A1.065 1.065 0 0 1 14 12.393l2.926-4.308a1.08 1.08 0 0 1 .755-.464a1.1 1.1 0 0 1 .85.257a9.2 9.2 0 0 1 2.379 3.25a1.07 1.07 0 0 1-.691 1.46M8.469.468a15 15 0 0 0-2.585.946a1.08 1.08 0 0 0-.564.65a1.06 1.06 0 0 0 .097.851l4.915 8.456a1.076 1.076 0 0 0 1.212.499a1.066 1.066 0 0 0 .799-1.034V1.072A1.065 1.065 0 0 0 11.622.06a1.1 1.1 0 0 0-.437-.057c-.918.072-1.826.228-2.715.465" clipRule="evenodd"/></svg>
          </div>
          <div className='flex flex-col w-full items-center gap-5'>
            <p className='font1 text-white text-xs md:text-base text-center'>Copyright © 2023 Marci METZGER Homes - All Rights Reserved</p>
            <div className='w-[70px] h-[1px] bg-[#faf9f7]'></div>
          </div>
        </section>
      


      </main>
    );
}

export default App
