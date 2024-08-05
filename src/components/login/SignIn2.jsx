import React from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// import '../style.scss'; // 추가적인 스타일은 여기에 작성

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <ConfigProvider>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">LOGIN</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ID" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Find ID / PW
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign In
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SignIn
