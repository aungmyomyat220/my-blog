'use client'
import React, {useState} from 'react';
import Sidebar from "./sidebar";
import isAuthenticated  from '../../auth/authenticate';
import ContentPage from "./contentPage";
import { useEffect } from 'react';
import { useRouter,useParams } from "next/navigation";
import NavBar from "@/app/Home/navbar";

const Page = () => {
    const {id} = useParams()
    const [searchMode,setSearchMode] = useState(false)
    const [searchKey,setSearchKey] = useState("")
    const router = useRouter()
    useEffect(() => {
        const isAuth = isAuthenticated;
        if(!isAuth){
          router.push("/")
        }else{
          router.push(`/profile/${id}`)
        }
      }, [])

    const handleChange = (data) => {
        const {key , searchMode} = data
        setSearchMode(searchMode)
        setSearchKey(key)
    }

    return (
        <>
            <div className='w-full h-screen'>
                <NavBar handleChange={handleChange}></NavBar>
                <div className='w-full flex flex-col sm:flex-row mt-7'>
                    <div className='sm:w-1/3 sm:border-l-2 border-gray-300 ml-32 sm:flex sm:justify-end'>
                        <Sidebar></Sidebar>
                    </div>
                    <div className='sm:w-2/3 sm:flex sm:justify-start'>
                        <ContentPage
                          searchKey={searchKey}
                          searchMode={searchMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;