'use client'
import Image from 'next/image'
import toncoinLogo from '@/image/toncoin.png'
import { Button, Table, Tooltip, TableProps, Tag } from 'antd'
import { depositAddress } from '../../../constant'
import {fromNano} from '@ton/ton'
/////// ================== tempory data ========================////////
import Cookies from 'js-cookie';
import { db } from '@/lib/firebase'
import { collection, getDocs, QuerySnapshot, DocumentData, getDoc, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

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
  
/////// ================== tempory data ========================////////


export default function Balance () {
    
    const [tableData, setTableData] = useState<DataType[]>();
    const [userInfo, setUserInfo] = useState();
    const [balance, setBalance] = useState(BigInt(0));
    const userCookie = Cookies.get('user');
    useEffect(() => {
        if(userCookie)
            setUserInfo(JSON.parse(userCookie!))
    }, [])
    console.log(userInfo)
    const docRef = collection(db, 'Campaign')

    useEffect(() => {
        let datas: DataType[] = []
        if(userInfo != undefined)
            getDoc(doc(db, `User/${userInfo ? userInfo.id : ''}`))
                .then(res => {
                    setBalance(res.get('balance'));
                })
        if(userInfo != undefined)

            getDocs(docRef).then((docRes) => {
                docRes.docs.map(docDoc => {
                    getDocs(collection(db, `Campaign/${docDoc.id}/Advertiser`)).then((adRes) => {
                        adRes.docs.map(adDoc => {
                            if(adDoc.id == (userInfo ? userInfo.id : '')){
                                const convertRef = collection(db, `Campaign/${docDoc.id}/Advertiser/${adDoc.id}/Convert`);
                                getDocs(convertRef).then((conRes) => {
                                    conRes.docs.map(conDoc => {
                                        datas.push({
                                            key: conDoc.id,
                                            amount: docDoc.get('amount'),
                                            datetime: (new Date(conDoc.get('date'))).toISOString(),
                                            tx: 'Reward for Convertion'
                                        })
                                        datas.sort((a, b) => {
                                            return (new Date(a.datetime)).getTime() - (new Date(b.datetime)).getTime()
                                        })
                                        setTableData(datas)
                                    })
                                })
                            }
                        })
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        if(userInfo != undefined)

            getDocs(collection(db, `User/${userInfo ? userInfo.id : ''}/Deposit`)).then(docRes => {
                docRes.docs.map( singleDoc =>{
                        datas.push({
                            amount: (singleDoc.get('amount')),
                            datetime: (new Date(singleDoc.get('date'))).toISOString(),
                            tx: singleDoc.get('tx'),
                            key: singleDoc.id
                        })
                        datas.sort((a, b) => {
                            return (new Date(a.datetime)).getTime() - (new Date(b.datetime)).getTime()
                        })
                        setTableData(datas)
                    }
                )
            })
      },[userInfo])

    return(
        <div>
            <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                <div className='flex flex-row mb-3'>
                    <Image 
                        alt='toncoin'
                        src={toncoinLogo}
                        className='w-10 h-10 mx-2 mt-2'
                    />
                    <div className='flex flex-col justify-center'>
                        <p className='text-xl font-semibold '>{fromNano(balance)} TON</p>
                        <p className='text-[#333]'>Current Balance</p>
                    </div>
                </div>
                <p className='text-lg font-semibold'>
                    Receive funds
                </p>
                <p>
                    Send the money using the wallet and the comment below so that we can track the transaction
                </p>
                <div className='flex flex-row justify-between p-3 my-3 border rounded-xl' >
                    <div className='flex flex-col justify-center'>
                        <p className='font-semibold py-1'>Wallet</p>
                        <p>{depositAddress}</p>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <Button>Copy</Button>
                    </div>
                </div>
                <div className='flex flex-row justify-between p-3 my-3 border rounded-xl' >
                    <div className='flex flex-col justify-center'>
                        <p className='font-semibold py-1'>Comment</p>
                        <p>{userInfo ? userInfo!.commit : ''}</p>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <Button>Copy</Button>
                    </div>
                </div>
            </div>
            <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                <Table columns={columns} dataSource={tableData} />
            </div>
        </div>
    )
}