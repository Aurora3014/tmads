"use client"
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Link from "next/link"
import {useState} from 'react'
import {signup} from '@/lib/auth'
import {db} from '@/lib/firebase'
import {addDoc, collection} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useParams } from 'next/navigation';

export default function SignUp ()  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {type} = useParams<{type: string}>()
    const handleFinish = async (e) => {
    //   e.preventDefault();
      try {
        await signup(email, password);
        const docRef = await addDoc(collection(db, "User"), {
            balance: 0,
            email,
            commit: uuidv4()
        });
        notification.success({
            message: 'Success',
            description: 'Login Successful',
        });
        alert('Signup successful!');
      } catch (error) {
        setError(error.message);
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
                        Sign up
                    </p>
                    <Form.Item<Text>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
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
                    <Link href={`/${type}/login`} className="self-right">Already have account?</Link>
                </Form>
            </div>
        </div>
    )
}