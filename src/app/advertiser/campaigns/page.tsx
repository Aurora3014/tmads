"use client"
import { CampaignCard } from '@/component/CampaignCard';
import { db } from '@/lib/firebase';
import { Button, Col, Row } from 'antd';
import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';


export default function Campaigns (){

  const [querySnapshot, setQuerySnapshot] = useState<QuerySnapshot<DocumentData> | undefined>(undefined);

  // querySnapshot = await getDocs(collection(db, "cities"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never  undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  useEffect(() => {
    getDocs(collection(db, "Campaign"))
      .then((res)=>{
        setQuerySnapshot(res);
      })
      .catch((error) => {
        console.error("Error fetching documents: ", error);
      });
  },[useState])

  return(
    <div className='flex flex-col'>
      <div className='w-full border broder-1 h-16 flex flex-row justify-between'>
        <div className='flex flex-col justify-center'>
          <p className='text-xl font-bold text-center ml-10'>Campaigns</p>
        </div>
        <div className='flex flex-col justify-center'>
          {/* <a href='/developer/newCampaign'>
            <Button className='mr-10' type="primary">New Campaign</Button>
          </a> */}
        </div>
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-10'>
          {
            querySnapshot?.docs.map((doc) => (
              <CampaignCard
                id={doc.id} 
                bannerName={doc.get('bannerName')} 
                logoName={doc.get('logoName')} 
                name={doc.get('name')} 
                description={doc.get('description')} 
                amount={doc.get('amount')} 
                key={doc.id}
                />
            ))
          }
      </div>
    </div>
  )
}