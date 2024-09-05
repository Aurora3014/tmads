// pages/api/newCampaign.ts
'use server'
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {

    const formdata =  await request.formData()
  
    try{
      const docRef = await addDoc(collection(db, "Campaign"), {
        name: formdata.get('name'),
        description: formdata.get('description'),
        logoName: formdata.get('logoName'),
        bannerName: formdata.get('bannerName'),
        website: formdata.get('website'),
        twitter: formdata.get('twitter'),
        discord: formdata.get('discord'),
        redirectUrl: formdata.get('redirectUrl'),
        amount: formdata.get('amount'),
        email: formdata.get('email'),
      });
      console.log(docRef)
    return NextResponse.json({ message: "New Campaign Created", id: docRef.id }, { status: 200 });
  } catch (err) {
      return NextResponse.json({ message: err }, {status: 400})
    }
}
 