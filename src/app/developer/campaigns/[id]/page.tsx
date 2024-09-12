'use client'

import { Button, notification, Table, TableProps, Modal, Tooltip } from 'antd'
import { serverUrl } from "@/constant"
import { getEmail } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { addDoc, collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, setDoc, } from "firebase/firestore"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { encode, decode } from 'js-base64';
import { DeleteOutlined, EditOutlined, EyeOutlined, PauseCircleOutlined, PlayCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { AdCard } from '@/component/AdCard'


interface DataType {
    key: string;
    tx: string;
    amount: number;
    datetime: string;
  }
  
const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Transaction',
        dataIndex: 'tx',
        key: 'tx',
        width: '50%',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: '20%'    
    },
    {
        title: 'Date & Time',
        dataIndex: 'datetime',
        key: 'datetime',
        width: '30%'    
    },
];
  
const data: DataType[] = [
    {
        key: '1',
        tx: '4d53570684b8df .... eb2f14608349f',
        amount: 0.5,
        datetime: '06-14-2024',
    },
];

/* eslint-disable @next/next/no-img-element */
export default function Campaign () {

    const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    // const [myAdSnap, setMyAdSnap] = useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    const [tableData, setTableData] = useState<DataType[]>();
    const [apiKey, setApiKey] = useState('')
    const {id} = useParams<{id: string}>()
    const docRef = doc(db, 'Campaign', id)
    const advertiserRef = collection(db, `Campaign/${id}/Advertiser`)
    useEffect(()=>{
        let datas: DataType[] = []
        getDoc(docRef).then((docRes) => {
            setDocSnap(docRes)
            setApiKey(encode(docRes!.id).split('=')[0]);
            getDocs(advertiserRef).then((adRes) => {
                adRes.docs.map(adDoc => {
                    const convertRef = collection(db, `Campaign/${id}/Advertiser/${adDoc.id}/Convert`);
                    getDocs(convertRef).then((conRes) => {
                        conRes.docs.map(conDoc => {
                            datas.push({
                                key: conDoc.id,
                                amount: docRes.get('amount'),
                                datetime: (new Date(conDoc.get('date'))).toISOString(),
                                tx: 'Reward for Convertion'
                            })
                            setTableData(datas)
                        })
                    })
                })
            })
        }).catch(err => {
            console.log(err)
        })
    },[useState])
    
    const handleCopy = async (target: any) => {
        navigator.clipboard.writeText(apiKey);
        notification.success({
            message: 'Success',
            description: "Copied to Clipboard",
        });
    }


    //Modal management

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return(
        <div className=''>
            <div className="flex flex-col pb-10 md:pb-20 mt-20">
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
                        <h2 className="text-lg font-semibold text-gray-900">Advertiser will earn 
                            <span className="font-semibold bg-green-200 px-2 py-1 rounded-md shadow-lg">{docSnap?.get('amount')} TON</span>
                            for each successful referral on 
                            <span className="text-purple-700 underline animate-pulse"> TON</span>
                            <img alt="TON" src='/images/ton.svg' width="25" height="25" decoding="async" data-nimg="1" className="m-1 inline"   />
                        </h2>
                        <>
                            <p className="text-gray-600 pb-4">API Key ( Keep this key secret. )</p>
                            <div className="flex bg-[#F3F4F6] rounded-md p-2 gap-3">
                                <input readOnly={true} className="font-roboto text-sm bg-transparent outline-none w-full" type="password" value={apiKey}/>
                                <button type="button" className="text-sm text-[#2563EB] font-bold bg-transparent hover:underline" onClick={handleCopy}>Copy</button>
                            </div>
                        </>
                        <div className='mt-5 flex flex-row justify-end'>
                            <Tooltip title='Preview'>
                                <Button icon={<EyeOutlined />} className='mr-3' onClick={()=>{setIsModalOpen(true)}}></Button>
                            </Tooltip>
                            <Tooltip title='Stop'>
                                <Button icon={<PauseCircleOutlined />} className='mr-3'></Button>
                            </Tooltip>
                            <Tooltip title='Edit'>
                                <a href={location.href.replace('campaigns', 'updateCampaign')} className='mr-3'><Button icon={<EditOutlined />}></Button></a>
                            </Tooltip>
                            </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='text-xl font-bold mb-4 ml-10'>TON spent</div>
                <Table columns={columns} dataSource={tableData} className='px-8' />
            </div>
            <Modal title="Preview Ads"  open={isModalOpen} onCancel={handleCancel} className="flex flex-row justify-center">
                <div className="w-[360px] h-[650px] tg_bg flex items-center justify-center p-16 rounded-[20px]">
                    <AdCard title={docSnap?.get('name')} description={docSnap?.get('description')} imageUrl={`/uploads/${docSnap?.get('logoName')}`} /> 
                </div>
            </Modal>
        </div>
    )
}