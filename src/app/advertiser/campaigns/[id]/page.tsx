'use client'

import { notification, Button } from 'antd'
import { serverUrl } from "@/constant"
import { getEmail } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { addDoc, collection, doc, DocumentData, DocumentSnapshot, getDoc, setDoc, } from "firebase/firestore"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';

/* eslint-disable @next/next/no-img-element */
export default function Campaign () {
    const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    const [myAdSnap, setMyAdSnap] = useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    
    const [email, setEmail] = useState('')
    const {id} = useParams<{id: string}>()
    const userInfo = JSON.parse(Cookies.get('user')!);
    const docRef = doc(db, 'Campaign', id)
    const adRef = doc(db, `Campaign/${id}/Advertiser`, userInfo.id!);
    useEffect(()=>{
        getDoc(docRef).then((res) => {
            setDocSnap(res)
        }).catch(err => {
            console.log(err)
        })
        getDoc(adRef).then((res)=>{
            setMyAdSnap(res)
        })
        getEmail().then((res) => {
            setEmail(res!);
        }).catch(err => {
            console.log(err)
        })
    },[useState])
    const handleClick = async () => {
        setLoading(true);
        await setDoc(doc(docRef, 'Advertiser', userInfo.id!), {
            clicks: 0,
            converts: 0,
            email: userInfo.id
        });
        getDoc(adRef).then((res)=>{
            setMyAdSnap(res)
        })
        setLoading(false);

    }
    const handleCopy = async (target: any) => {
        navigator.clipboard.writeText(`${serverUrl}/adcard/${docSnap?.id}/${myAdSnap!.id}`);
        notification.success({
            message: 'Success',
            description: "Copied to Clipboard",
        });
    }

    //Modal managemant
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return(

        <div className="min-h-screen flex flex-col pb-10 md:pb-20 mt-20">
            <div className="h-[200px] w-full relative mb-32 lg:mb-24 flex justify-center ">
                <img alt="Cover" src={`/uploads/${docSnap?.get('bannerName')}`} decoding="async" data-nimg="fill" sizes="100vw" className="absolute inset-0 h-full w-full object-cover text-transparent"/>
                <div className="w-11/12 sm:w-2/3 absolute bottom-[-100px] lg:bottom-[-75px] flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex flex-row items-end justify-between lg:justify-normal w-full">
                        <div className="w-20 lg:w-40 rounded-full shadow-md flex items-center justify-center ">
                            <img alt="Logo" src={`/uploads/${docSnap?.get('logoName')}`} width="100" height="100" decoding="async" data-nimg="1" className="w-full rounded-full" />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold px-3 sm:px-5 py-2 sm:py-3 md:py-4 lg:py-5 truncate w-full lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[720px]">
                            {docSnap?.get('name')}
                        </h1>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-5">
                        <a target="_blank" className="w-14 h-14 lg:w-16 lg:h-16 p-2 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105" href={docSnap?.get('website')}>
                            <img alt="www.png" width="40" height="40" decoding="async" data-nimg="1"  src='/images/www.png' />
                        </a>
                        <a target="_blank" className="w-14 h-14 lg:w-16 lg:h-16 p-2 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105" href={docSnap?.get('twitter')}>
                            <img alt="x.png" width="30" height="30" decoding="async" data-nimg="1" src='/images/x.png' />
                        </a>
                        <a target="_blank" className="w-14 h-14 lg:w-16 lg:h-16 p-2 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105" href={docSnap?.get('discord')}>
                            <img alt="discord.png" width="40" height="40" decoding="async" data-nimg="1" src="/images/discord.png" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-11/12 sm:w-2/3 flex flex-col lg:flex-row mx-auto gap-10 mb-10">
                <div className="basis-3/5 border rounded-lg shadow-md p-6 text-lg bg-white ">
                    {docSnap?.get('description')}
                </div>
                <div className="basis-2/5 border rounded-lg shadow-md p-6 h-min bg-white">
                    <h2 className="text-lg font-semibold text-gray-900">Earn 
                        <span className="font-semibold bg-green-200 px-2 py-1 rounded-md shadow-lg">{docSnap?.get('amount')} TON</span>
                        for each successful referral on 
                        <span className="text-purple-700 underline animate-pulse"> TON</span>
                        <img alt="TON" src='/images/ton.svg' width="25" height="25" decoding="async" data-nimg="1" className="m-1 inline"   />
                    </h2>
                   
                    {
                        myAdSnap?.exists() ? (
                            <>
                                <p className="text-gray-600 pb-4">Share this url with others to get reward.</p>
                                <div className="flex bg-[#F3F4F6] rounded-md p-2 gap-3">
                                    <input readOnly={true} className="font-roboto text-sm bg-transparent outline-none w-full" type="text" value={`${serverUrl}/adcard/${docSnap?.id}/${myAdSnap.id}`}/>
                                    <button type="button" className="text-sm text-[#2563EB] font-bold bg-transparent hover:underline" onClick={handleCopy}>Copy</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 pb-4">Join the project to start referring others.</p>

                                <Button
                                    className="bg-sky-500 text-white w-full text-sm py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={handleClick}
                                    loading={loading}>
                                    Join Project
                                </Button>
                            </>
                        )
                    }
                    
                </div>
            </div>

        </div>

    )
}