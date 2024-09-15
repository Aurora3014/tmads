'use server'

import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";
import { decode } from 'js-base64'
import Cookies from 'js-cookie';
import { toNano } from '@ton/core'


export async function GET (req: NextRequest, res:NextResponse) {
    try {
        const me = req.nextUrl.searchParams.get('me');
        const ad = req.nextUrl.searchParams.get('ad');
        const docRef = doc(db, 'Campaign', me!)
        const docData = await getDoc(docRef);
        const redirectURL = await docData.get('redirectUrl');
        // const newDocRef = await addDoc(collection(docRef, `Advertiser/${ad}/Click`), {
        //     date: Date.now()
        // })
        return NextResponse.redirect(redirectURL + `?ad=${ad}`)
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 200 });
        
    }
}

// TODO: handle reward logic
export async function POST (req: NextRequest, res:NextResponse) {
    try {
        // const userInfo = JSON.parse(Cookies.get('user')!);
        const apiKey = req.headers.get('x-api-key');
        const me = decode(apiKey + '=')
        const ad = req.nextUrl.searchParams.get('ad');
        const docRefCampaignme = doc(db, 'Campaign', me);
        const docDataCampaignme = await getDoc(docRefCampaignme);
        const docRefme = doc(db, 'User', docDataCampaignme.get('email'))
        const docRefad = doc(db, 'User', ad!)
        console.log(me, ad)
        const docDatame = await getDoc(docRefme);
        // const docDataad = await getDoc(docRefad);
        await updateDoc(docRefme, {
            balance: (toNano(docDatame.get('balance') ? docDatame.get('balance') : 0) - toNano(docDataCampaignme.get('amount') ? docDataCampaignme.get('amount') : 0)).toString()
        });
        await updateDoc(docRefad, {
            balance: (toNano(docDatame.get('balance') ? docDatame.get('balance') : 0) + toNano(docDataCampaignme.get('amount') ? docDataCampaignme.get('amount') : 0)).toString()
        });
        await addDoc(collection(db, `User/${docDatame.id}/Deposit`),{
            date: Date.now(),
            tx: 'Reward for Convertion',
            amount: -docDataCampaignme.get('amount')
        })
        const newDocRef = await addDoc(collection(docRefCampaignme, `Advertiser/${ad}/Convert`), {
            date: Date.now(),
        })
        
        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Bad Request' }, { status: 500 });
    }
} 