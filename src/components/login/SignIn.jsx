import React from 'react';
import { ConfigProvider, Form, Input, Button, Alert, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/authorization/useAuth';
import '../../assets/styles/style.scss';

const SignIn = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit, rememberMe, setRememberMe } = useAuth();

  const onFinish = (values) => {
    // values 객체에 폼 데이터가 포함되어 있습니다
    handleSubmit({ preventDefault: () => {} }); // 이벤트 객체를 모방합니다
  };

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
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Row justify="space-between">
                <Col>
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Remember me
                  </Checkbox>
                </Col>
                <Col>
                  <a className="login-form-forgot" href="/find-account">
                    Find ID / PW
                  </a>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SignIn;