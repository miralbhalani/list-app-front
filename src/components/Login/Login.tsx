import React, { FC, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { getToken } from '../../services';


interface LoginProps {
}

const Login: FC<LoginProps> = (props) => {

  const [error, setError] = useState(false);

  const onFinish = async (values: any) => {

    try {
      let tokenG = await getToken({
        username: values.userName,
        password: values.password
      })

      localStorage.token = tokenG;
      window.location.reload()
    } catch (error) {
      setError(true)
    }
    

  };
  
  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <>

      {
        error && <div style={{color: "red"}}>Please enter valid username and password</div>
      }
      LOGIN
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
          
        <Form.Item
          label="User Name"
          name="userName"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input data-testid="form-intput-title"  />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input type='password' data-testid="form-intput-title"  />
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" 
            data-testid="form-submit-title">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default Login;
