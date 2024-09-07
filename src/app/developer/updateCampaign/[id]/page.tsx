'use client'
import { Button, Input, InputNumber, Skeleton, Upload, notification, } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {  UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { AdCard } from '@/component/AdCard'
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation'
import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function UpdateCampaign () {
    const {id} = useParams<{id: string}>()
    const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    const [logoFileName, setLogoFileName] = useState('') 
    const [bannerFileName, setBannerFileName] = useState('') 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [userInfo, setUserInfo] = useState();
    const [logoFileList, setLogoFileList] = useState<UploadFile[]>([]);
    const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
    const userCookie = Cookies.get('user');
    
    useEffect(() => {
        if(userCookie)
            setUserInfo(JSON.parse(userCookie!))
    }, [])
    
    const docRef = doc(db, 'Campaign', id)
    
    const onLogoChange = (info: UploadChangeParam) => {
        const latestFileList = [info.file]; // Keep only the most recent file
        setLogoFileList(latestFileList);
        setLogoFileName(info.file.name.replaceAll(' ', '_'));

        // If needed, you can do something with the new logo file
        console.log(latestFileList);
    };

    const onBannerChange = (info: UploadChangeParam) => {
        const latestFileList = [info.file]; // Keep only the most recent file
        setBannerFileList(latestFileList);
        setBannerFileName(info.file.name.replaceAll(' ', '_'));

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setImageUrl(url);
            });
        }

        // If needed, you can do something with the new banner file
        console.log(latestFileList);
    };


    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        if( !title || !logoFileName || !bannerFileName || !description || !imageUrl || !formData.get('amount') || !formData.get('redirectUrl')){
            console.log(title , logoFileName , bannerFileName , description , imageUrl , formData.get('amount') , formData.get('redirectUrl'))
            notification.error({
                message: 'Error',
                description: 'Please enter neccesary informations',
            });
            return;
        }

        formData.append('logoName', logoFileName)
        formData.append('bannerName', bannerFileName)
        formData.append('email', userInfo.id)
        formData.append('id', id);
        // formData.append('userId', userInfo.id)
        console.log(userInfo)
        try {
        const response = await fetch('/api/update-campaign', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            notification.success({
                message: 'Success',
                description: result.message,
            });
        } else {
            notification.error({
                message: 'Error',
                description: response.statusText,
            });
        }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Unexpected Error',
            });
        }
    }

    useEffect(() => {
        getDoc(docRef).then((res) => {
            console.log(res)
            setDocSnap(res);
            setImageUrl(`/uploads/${res?.get('bannerName')}`);
            setLogoFileName(res?.get('logoName'))
            setBannerFileName(res?.get('bannerName'))
            setTitle(res.get('name'))
            setDescription(res.get('description'))
            setLogoFileList([
                {
                    uid: '-1', // Unique identifier for the file
                    name: res?.get('logoName'), // Arbitrary name for the file
                    status: 'done', // Status of the file
                    url: `/uploads/${res?.get('logoName')}`, // URL of the image
                },
            ] )
            setBannerFileList([
                {
                    uid: '-1', // Unique identifier for the file
                    name: res?.get('bannerName'), // Arbitrary name for the file
                    status: 'done', // Status of the file
                    url: `/uploads/${res?.get('bannerName')}`, // URL of the image
                },
            ])
            
            console.log(res.get("name"))
        }).catch(error => console.log(error))
    },[])

    return(
        <div className="w-full">
            <div className='flex flex-row justify-between'>
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                        <Skeleton loading={!docSnap?.exists()} active>

                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center w-full'>
                                <p className='text-2xl font-semibold mb-4'>Campaign</p>
                                <p className="text-md font-semibold mb-4">Name *</p>
                                <Input name='name' className="w-full mb-4" onChange={e => setTitle(e.target.value)} maxLength={32} defaultValue={docSnap ? docSnap!.get('name') : ''}/>
                                <p className="text-md font-semibold my-4">Description *</p>
                                <TextArea name='description' rows={4}  onChange={e => setDescription(e.target.value)} maxLength={160} defaultValue={docSnap?.get('description')}/>
                            </div>
                        </div>
                        </Skeleton>
                    </div>
                    
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                        <Skeleton loading={!docSnap?.exists()} active>

                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center'>
                                <p className='text-2xl font-semibold mb-4'>Image</p>
                                <p className='text-md mb-4'>Logo *</p>
                                <Upload name="image" action='/api/upload-image' listType="picture" onChange={onLogoChange} fileList={logoFileList}  multiple={false}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                                <p className='text-md my-4'>Banner *</p>
                                <Upload name="image" action='/api/upload-image' listType="picture" onChange={onBannerChange} fileList={bannerFileList}  multiple={false}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </div>
                        </div>
                        </Skeleton>
                    </div>
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                        <Skeleton loading={!docSnap?.exists()} active>

                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center w-full'>
                                <p className='text-2xl font-semibold mb-4'>Social</p>
                                <p className='text-md mb-4'>Website</p>
                                <Input name='website' className="w-full mb-4" defaultValue={docSnap?.get('website')}/>
                                <p className='text-md my-4'>Twitter</p>
                                <Input name='twitter' className="w-full mb-4" defaultValue={docSnap?.get('twitter')} />
                                <p className='text-md my-4'>Discord</p>
                                <Input name='discord' className="w-full mb-4" defaultValue={docSnap?.get('discord')}/>
                            </div>
                        </div>
                        </Skeleton>
                    </div>
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                        <Skeleton loading={!docSnap?.exists()} active>

                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center  w-full'>
                                <p className='text-2xl font-semibold mb-4'>Strategy</p>
                                <p className='text-md mb-4'>Reward Amount *</p>
                                <InputNumber name='amount' addonAfter="TON" className="" defaultValue={docSnap?.get('amount')}/>
                                <p className='text-md my-4'>Redirect URL *</p>
                                <Input name='redirectUrl' className="w-full" defaultValue={docSnap?.get('redirectUrl')}/>
                            </div>
                        </div>
                        </Skeleton>
                    </div>
                    {/* <Button className="w-sm mx-6 border flex flex-col mb-4" size="large">Add new Banner</Button> */}
                    <div className='mr-12 px-6 w-full'>
                        <button className="w-full border mb-4 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-center" type="submit" >Update Campaign Details</button>
                    </div>
                </form>
                <div className='items-center justify-center mt-10'>
                    <Skeleton loading={!docSnap?.exists()} active>
                        <div className="w-[360px] h-[650px] tg_bg flex items-center justify-center p-16 rounded-[20px]">
                            <AdCard title={title} description={description} imageUrl={imageUrl}/>
                        </div>
                    </Skeleton>
                </div>
            </div>
        </div>
    )
}