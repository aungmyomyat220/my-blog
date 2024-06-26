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
        const userData = sessionStorage.getItem('user');
        if(!userData){
          router.push("/")
        }else{
          router.push(`/profile/${id}`)
        }
      }, [])

    let user = {}
    const userData = sessionStorage.getItem('user');
    if (userData) {
        user = JSON.parse(userData)
    }

    const handleChange = (data) => {
        const {key , searchMode} = data
        setSearchMode(searchMode)
        setSearchKey(key)
    }

    return (
        <>
            <div className='w-full h-screen'>
                <NavBar handleChange={handleChange}></NavBar>
                <div className='w-full flex flex-col sm:flex-row px-10 md:px-40'>
                    <div className='sm:w-1/3 sm:border-r-2 sm:h-screen border-gray-300 ml-14'>
                        <Sidebar></Sidebar>
                    </div>
                    <div className='sm:w-2/3 sm:ml-5'>
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