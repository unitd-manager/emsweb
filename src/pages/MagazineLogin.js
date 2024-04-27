import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Card, Col,Row,message } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from "../constants/api";

const MagazineLogin = ({login,setLogin,register,setRegister}) => {

const navigate = useNavigate();
  // const handleToggle = () => {
  //   setRegister(true);
  //   setLogin(false);
  // };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    api
    .post('/auth/login', values)
    .then((res) => {
      if (res && res.data.status === '400') {
        alert('Invalid Username or Password');
      } else {
        
        localStorage.setItem('user',JSON.stringify(res.data.data));
        localStorage.setItem('token', JSON.stringify(res.data.token));
       
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
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

        {/* <a className="login-form-forgot" href="/forgotpassword">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <span style={{ marginRight: '10px' }}></span>
        {/* Or <span onClick={handleToggle}><a>register now!</a></span> */}
      <Link to="/MagazineRegisterForm">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        </Link>
        {/* Or <span onClick={handleToggle}><a>register now!</a></span> */}
      </Form.Item>
    </Form>
    </Card>
    </Col>
    <Col md="3"></Col>
    </Row>
    </div>
  );
};
export default MagazineLogin;