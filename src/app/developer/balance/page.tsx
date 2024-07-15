'use client'
import Image from 'next/image'
import toncoinLogo from '@/image/toncoin.png'
import { Button, Table, Tooltip, TableProps, Tag } from 'antd'

/////// ================== tempory data ========================////////


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
/////// ================== tempory data ========================////////


export default function balance () {
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
                        <p className='text-xl font-semibold '>0.03 TON</p>
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
                        <p>UQCYCf9U1uYk4JeX0Cy469X4p-n2eLdPwEBSKh_kumxPKUkO</p>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <Button>Copy</Button>
                    </div>
                </div>
                <div className='flex flex-row justify-between p-3 my-3 border rounded-xl' >
                    <div className='flex flex-col justify-center'>
                        <p className='font-semibold py-1'>Comment</p>
                        <p>06d45d21-a866-44c1-8fdb-3e37bdde21da</p>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <Button>Copy</Button>
                    </div>
                </div>
            </div>
            <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}