import React, { useEffect } from 'react';
import { ConfigProvider, Form, Input, Button, Alert, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/authorization/useAuth';
import '../../assets/styles/style.scss';
import FindModal from './FindModal';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    error, 
    handleSubmit, 
    rememberMe, 
    setRememberMe, 
    handleModalOpen, 
    handleModalClose, 
    isModalVisible, 
    onFinish, 
    onSuccess, 
    onFailure 
  } = useAuth();
  const navigate = useNavigate();



  return (
    <ConfigProvider>
      <div className="login-page">
        <div className="login-container">
          <Form 
            className="login-form" 
            onFinish={onFinish}
            initialValues={{ email, password, remember: rememberMe }}
          >
            <h2 className="login-title">Sign In</h2>
            {error && <Alert message={error} type="error" className="error-message" />}
            <Form.Item
              name="email"
              className="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                className='login-email-input'
                prefix={<UserOutlined />}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              className="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                className='login-password-input'
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" className="remember">
              <Row justify="space-between">
                <Col>
                  <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                    Remember me
                  </Checkbox>
                </Col>
                <Col>
                  <a className='find-btn' onClick={handleModalOpen}>Find ID / PW</a>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Sign In
                </Button>
              </Row>
            </Form.Item>
            <Form.Item>
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
              />
            </Form.Item>
          </Form>
        </div>
        <FindModal isOpen={isModalVisible} onClose={handleModalClose} />
      </div>
    </ConfigProvider>
  );
};

export default SignIn;