'use client'
import Image from 'next/image'
import toncoinLogo from '@/image/toncoin.png'
import { Button, Table, Tooltip, TableProps, Tag, Input, Radio, Space, Checkbox, InputNumber } from 'antd'

export default function newCampaign () {
    return(
        <div className="max-w-screen-lg flex flex-col">
            <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                <div className='flex flex-row mb-3'>
                    <div className='flex flex-col justify-center w-full'>
                        <p className='text-2xl font-semibold mb-4'>Campaign name</p>
                        <Input className="w-full" />
                    </div>
                </div>
            </div>
            <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                <div className='flex flex-col mb-3'>
                    <div className='flex flex-col justify-center w-full mb-4'>
                        <p className='text-2xl font-semibold mb-4'>Targeting</p>
                        <p className="text-md font-semibold mb-4">Interface language</p>
                        <Radio.Group className="">
                            <Space direction="vertical">
                                <Radio value={1}>All languages</Radio>
                                <Radio value={2}>Specify</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex flex-col justify-center w-full mb-4'>
                        <p className="text-md font-semibold mb-4">Country</p>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>All countries</Radio>
                                <Radio value={2}>Specify</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex flex-col justify-center w-full mb-4'>
                        <p className="text-md font-semibold mb-4">Platform</p>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>Android & IOS</Radio>
                                <Radio value={2}>Android</Radio>
                                <Radio value={3}>IOS</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex flex-col justify-center w-full mb-4'>
                        <p className="text-md font-semibold mb-4">Telegram Premium</p>
                        <Checkbox>Have the subscription</Checkbox>
                    </div>
                </div>
            </div>
            <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                <div className='flex flex-row mb-3'>
                    <div className='flex flex-col justify-center'>
                        <p className='text-2xl font-semibold mb-4'>Strategy</p>
                        <p className='text-md mb-4'>Daily Budget</p>
                        <InputNumber addonAfter="TON" className="" />
                        <p className='text-md my-4'>Cost per mile</p>
                        <InputNumber addonAfter="TON" className="" />
                    </div>
                </div>
            </div>
            <Button className="w-sm mx-6 border flex flex-col mb-4" size="large">Add new Banner</Button>
            <Button className="w-sm mx-6 border flex flex-col mb-4" size="large" type="primary">Create New Campaign and Launch</Button>
        </div>
    )
}