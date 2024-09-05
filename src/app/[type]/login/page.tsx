"use client"
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Link from "next/link"
import { useState, useEffect } from 'react'
import { login, logout } from '../../../lib/auth';
import { useRouter, useParams } from 'next/navigation';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from "../../../lib/firebase"
import Cookies from 'js-cookie';

export default function Login ()  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const {type} = useParams<{type: string}>()

    Cookies.set('mode', type);

    const handleFinish = async (e) => {
        try {
            await login(email, password);
            
            const q = query(collection(db, "User"), where("email", "==", email));

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            Cookies.set('user', JSON.stringify({
                id: querySnapshot.docs[0].id,
                commit: querySnapshot.docs[0].get('commit'),
                balance: querySnapshot.docs[0].get('balance'),
                email
            }))
            router.push(`/${type}/balance`);
            notification.success({
                message: 'Success',
                description: 'Login Successful',
            });
        } catch (error) {
          setError(error.message);
          console.log(error)
        }
    };
    
    return(
        <div className="flex flex-row justify-center">
            <div className="mt-10 w-sm p-4 border bg-white ">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={handleFinish}
                >
                    <p className="text-2xl font-bold text-center p-3 mb-3">
                        Login
                    </p>
                    <Form.Item<Text>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                    <Input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Submit
                    </Button>
                    </Form.Item>
                    {error && <p className="text-[#ff0000]">{error}</p>}
                    <Link href={`/${type}/signup`} className="text-right">Have no account?</Link>
                </Form>
            </div>
        </div>
    )
}