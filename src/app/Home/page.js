"use client";
import NavBar from "./navbar";
import { useState } from "react";
import ForYou from "./foryou";
import Suggestion from "./suggestion";
import Cookies from 'js-cookie';

export default function Home() {
  const [activeTab, setActiveTab] = useState("foryou");
  const [searchMode,setSearchMode] = useState(false)
  const [searchKey,setSearchKey] = useState("")

  const handleClick = (tabname) => {
    setActiveTab(tabname);
  };
  // console.log('Cookies after login:', Cookies.get());

    const handleChange = (data) => {
      const {key , searchMode} = data
      setSearchMode(searchMode)
      setSearchKey(key)
  }

  return (
    <div>
      <div className="flex flex-col w-full items-center h-screen">
        <NavBar handleChange={handleChange}></NavBar>
        <div className="grid grid-cols-1 sm:grid-cols-6 w-full h-full px-5">
          {/*First Div*/}
          <div className="col-span-4 pt-10">
            {/*menu*/}
            <div className="border-b grid grid-cols-12 text-center text-gray-500">
              <span
                className={`col-span-2 py-4 cursor-pointer ${
                  activeTab === "foryou" ? `border-b border-black` : `border-0`
                }`}
                onClick={() => handleClick("foryou")}
              >
                For you
              </span>
              {/*<span*/}
              {/*  className={`col-span-2 py-4 cursor-pointer ${*/}
              {/*    activeTab === "following"*/}
              {/*      ? `border-b border-black`*/}
              {/*      : `border-0`*/}
              {/*  }`}*/}
              {/*  onClick={() => handleClick("following")}*/}
              {/*>*/}
              {/*  Following*/}
              {/*</span>*/}
              <span className="col-span-8"></span>
            </div>
            {/*Data*/}

            <div>
                <ForYou
                  searchKey={searchKey}
                  searchMode={searchMode}
                >
                </ForYou>
            </div>
          </div>

          {/*Second Div*/}
          <div className="col-span-2 sm:border-l pt-14 px-5 pb-20">
            <Suggestion></Suggestion>
          </div>
          </div>
      </div>
      {/*  <AblyConnect></AblyConnect>*/}
      {/*  <AblyConnect></AblyConnect>*/}
    </div>
  );
}
