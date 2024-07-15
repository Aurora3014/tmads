"use client"
import { Button, Checkbox, Form, Input } from 'antd';
import Link from "next/link"
export default function login ()  {
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
                >
                    <p className="text-2xl font-bold text-center p-3 mb-3">
                        Sign up
                    </p>
                    <Form.Item<Text>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Submit
                    </Button>
                    </Form.Item>
                    <Link href="/login" className="self-right">Already have account?</Link>
                </Form>
            </div>
        </div>
    )
}