import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Card, Col,Row } from 'antd';

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className='container center'>
      <Row>
        <Col md="3"></Col>
        <Col md="6">
    <Card title="SignIn" >
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
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

        <a className="login-form-forgot" href="/forgotpassword">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/signup">register now!</a>
      </Form.Item>
    </Form>
    </Card>
    </Col>
    <Col md="3"></Col>
    </Row>
    </div>
  );
};
export default Login;

// #components-form-demo-normal-login .login-form {
//   max-width: 300px;
// }
// #components-form-demo-normal-login .login-form-forgot {
//   float: right;
// }
// #components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
//   float: left;
// }
// #components-form-demo-normal-login .login-form-button {
//   width: 100%;
// }