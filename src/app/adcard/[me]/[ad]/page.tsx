'use client'
import { useParams } from "next/navigation"
import { doc, getDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { AdCard } from '@/component/AdCard'
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

const AdcardShow = () => {
    const {me} = useParams<{me: string}>()
    const {ad} = useParams<{ad: string}>()
    const [docDataCampaignme, setDocDataCampaignme] = useState<DocumentSnapshot<DocumentData> | undefined>()
    // const [docDatame, setDocDatame] = useState<DocumentSnapshot<DocumentData> | undefined>()
    // const [docDataad, setDocDataad] = useState<DocumentSnapshot<DocumentData> | undefined>()
    const docRefCampaignme = doc(db, `Campaign`, me);

    useEffect(() => {
        getDoc(docRefCampaignme).then(res => {
            setDocDataCampaignme(res);
            // const docRefme = doc(db, 'User', docDataCampaignme!.get('email'))
            // const docRefad = doc(db, 'User', ad!)
            // getDoc(docRefme).then(res => {
            //     setDocDatame(res)
            // })
            // getDoc(docRefad).then(res => {
            //     setDocDataad(res)
            // })
        })
    })
    return (
        <>
            <div className="tg_bg h-screen flex flex-col justify-center">
                <div className="flex flex-row justify-center w-full w-[360px] h-[650px]">
                    <AdCard
                        title={docDataCampaignme?.get('name')} 
                        description={docDataCampaignme?.get('description')} 
                        imageUrl={`/uploads/${docDataCampaignme?.get('bannerName')}`} 
                        redirectUrl={`/api?me=${me}&ad=${ad}`} />
                </div>
            </div>
        </>
    )
}

export default AdcardShow;