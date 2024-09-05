'use client'
import { Button, Input, InputNumber, Upload, notification, } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { AdCard } from '@/component/AdCard'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

export default function NewCampaign () {
    const router = useRouter()
    const [logoFileName, setLogoFileName] = useState('') 
    const [bannerFileName, setBannerFileName] = useState('') 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const userInfo = JSON.parse(Cookies.get('user')!);
    console.log(userInfo)
    const onLogoChange = (info: UploadChangeParam) => {
        setLogoFileName(info.file.name.replaceAll(' ', '_'))
    }

    const onBannerChange = (info: UploadChangeParam) => {
        setBannerFileName(info.file.name.replaceAll(' ', '_'))
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setImageUrl(url);
            });
        }
    }
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        const formData = new FormData(form);
        if( !title || !logoFileName || !bannerFileName || !description || !imageUrl || !formData.get('amount') || !formData.get('redirectUrl')){
            notification.error({
                message: 'Error',
                description: 'Please enter neccesary informations',
            });
            setLoading(false)
            return;
        }

        formData.append('logoName', logoFileName)
        formData.append('bannerName', bannerFileName)
        formData.append('email', userInfo.id)
        // formData.append('userId', userInfo.id)
        console.log(userInfo)
        try {
        const response = await fetch('/api/new-campaign', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            notification.success({
                message: 'Success',
                description: result.message,
            });
            router.replace(location.href.replace('newCampaign', `campaigns/${result.id }`))
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
            console.log(error)
        }
        setLoading(false);
        
    }
    return(
        <div className="w-full">
            <div className='flex flex-row justify-between'>
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe]">
                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center w-full'>
                                <p className='text-2xl font-semibold mb-4'>Campaign</p>
                                <p className="text-md font-semibold mb-4">Name *</p>
                                <Input name='name' className="w-full mb-4" onChange={e => setTitle(e.target.value)} maxLength={32}/>
                                <p className="text-md font-semibold my-4">Description *</p>
                                <TextArea name='description' rows={4}  onChange={e => setDescription(e.target.value)} maxLength={160}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center'>
                                <p className='text-2xl font-semibold mb-4'>Image</p>
                                <p className='text-md mb-4'>Logo *</p>
                                <Upload name="image" action='/api/upload-image' listType="picture" onChange={onLogoChange} multiple={false} >
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                                <p className='text-md my-4'>Banner *</p>
                                <Upload name="image" action='/api/upload-image' listType="picture" onChange={onBannerChange} multiple={false}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </div>
                        </div>
                    </div>
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center w-full'>
                                <p className='text-2xl font-semibold mb-4'>Social</p>
                                <p className='text-md mb-4'>Website</p>
                                <Input name='website' className="w-full mb-4" />
                                <p className='text-md my-4'>Twitter</p>
                                <Input name='twitter' className="w-full mb-4" />
                                <p className='text-md my-4'>Discord</p>
                                <Input name='discord' className="w-full mb-4" />
                            </div>
                        </div>
                    </div>
                    <div className="w-sm m-6 p-6 border flex flex-col bg-[#fbfcfe] mb-4">
                        <div className='flex flex-row mb-3'>
                            <div className='flex flex-col justify-center  w-full'>
                                <p className='text-2xl font-semibold mb-4'>Strategy</p>
                                <p className='text-md mb-4'>Reward Amount *</p>
                                <InputNumber name='amount' addonAfter="TON" className="" />
                                <p className='text-md my-4'>Redirect URL *</p>
                                <Input name='redirectUrl' className="w-full" />
                            </div>
                        </div>
                    </div>
                    {/* <Button className="w-sm mx-6 border flex flex-col mb-4" size="large">Add new Banner</Button> */}
                    <div className='mr-12 px-6 w-full'>
                        <button className="w-full border mb-4 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-center flex flex-row justify-center" type="submit" >
                            {loading ?
                                <svg className="animate-spin ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                : <></>
                            }
                            Create new Campaign and launch
                        </button>
                    </div>
                </form>
                <div className='items-center justify-center mt-10'>
                    <div className="w-[360px] h-[650px] tg_bg flex items-center justify-center p-16 rounded-[20px]">
                        <AdCard title={title} description={description} imageUrl={imageUrl}/>
                    </div>
                </div>
            </div>
        </div>
    )
}