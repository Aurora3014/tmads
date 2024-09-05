// pages/api/newCampaign.ts
'use server'
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {

    const formdata =  await request.formData()
    try{
        const docRoute = doc(db, "Campaign", formdata.get('id')!.toString());
        const docRef = await setDoc(docRoute, {
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
    } catch (err) {
      return NextResponse.json({ message: err }, {status: 400})
    }
    return NextResponse.json({ message: "New Campaign Created" }, { status: 200 });
}
 