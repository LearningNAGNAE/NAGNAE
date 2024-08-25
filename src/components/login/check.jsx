import React from 'react';
import { ConfigProvider, Form, Input, Button, Alert, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/authorization/useAuth'; // Adjust the path based on your project structure
import '../../assets/styles/style.scss';
import FindModal from './FindModal';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  // Destructure the necessary states and functions from the useAuth hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    isModalVisible,
    handleModalOpen,
    handleModalClose,
    onFinish,
    onSuccess,
    onFailure
  } = useAuth();

  return (
    <ConfigProvider>
      <div className="login-page">
        <div className="login-container">
          <Form
            className="login-form"
            onFinish={onFinish}
            initialValues={{ email, password }}
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
            <Form.Item className="remember" valuePropName="checked">
              <Row justify="space-between">
                <Col>
                  <Checkbox
                    onChange={(e) => localStorage.setItem('rememberMe', e.target.checked)}
                  >
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
