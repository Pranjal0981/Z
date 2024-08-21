import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Card, Typography, Spin, Row, Col, Avatar, Divider } from 'antd'; // Ant Design components
import 'antd/dist/reset.css'; // Import Ant Design styles
import { Link, useNavigate } from 'react-router-dom';
import { asyncCurrentUser, asyncSignIn, asyncSignupUser } from '../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const { Title, Text } = Typography;

export const Signup = () => {
    const dispatch = useDispatch();
  
    // Form submission handler
    const handleSubmit = async (values) => {
        console.log('Received values from form:', values);
        
        // Dispatch the action with the form values directly
        await dispatch(asyncSignupUser(values));
    };
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
                    Create an Account
                </h2>
                <Form
                    name="signup"
                    onFinish={handleSubmit} // Use onFinish for form submission
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    {/* First Name */}
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            { required: true, message: 'Please enter your first name!' },
                            { min: 4, message: 'First name must be at least 4 characters long' },
                        ]}
                    >
                        <Input placeholder="John" className="rounded-md" />
                    </Form.Item>
  
                    {/* Last Name */}
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            { required: true, message: 'Please enter your last name!' },
                            { min: 4, message: 'Last name must be at least 4 characters long' },
                        ]}
                    >
                        <Input placeholder="Doe" className="rounded-md" />
                    </Form.Item>
  
                    {/* Email */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="john.doe@example.com" className="rounded-md" />
                    </Form.Item>
  
                    {/* Password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            { min: 4, message: 'Password must be at least 4 characters long' },
                        ]}
                    >
                        <Input.Password placeholder="••••••••" className="rounded-md" />
                    </Form.Item>
  
                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};


export const Login = () => {
    const dispatch=useDispatch()
    // Form submission handler
    const navigate=useNavigate()
    const onFinish = async(values) => {
      console.log('Received values from form:', values);
      await dispatch(asyncSignIn(values,navigate))
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
            Log In
          </h2>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="john.doe@example.com" className="rounded-md" />
            </Form.Item>
  
            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 4, message: 'Password must be at least 4 characters long' },
              ]}
            >
              <Input.Password placeholder="••••••••" className="rounded-md" />
            </Form.Item>
  
            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};
  

export const Profile = () => {
    const dispatch=useDispatch()
    const {user} = useSelector((state) => state.user);

    useEffect(()=>{
        dispatch(asyncCurrentUser())
    },[dispatch,user._id])
console.log(user)
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        ); // Loading spinner
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Card
                title={<Title level={2} style={{ textAlign: 'center' }}>User Profile</Title>}
                bordered={false}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
            >
                <Row justify="center" style={{ marginBottom: '20px' }}>
                    <Col>
                        <Avatar
                            size={100}
                            src="https://joeschmoe.io/api/v1/random" // Placeholder avatar
                            style={{ marginBottom: '16px' }}
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Title level={4}>User Information</Title>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Email:</Text> <Text>{user.email}</Text>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>First Name:</Text> <Text>{user.firstName || 'N/A'}</Text>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Last Name:</Text> <Text>{user.lastName || 'N/A'}</Text>
                        </div>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={24}>
                        <Title level={4}>Additional Information</Title>
                        <Text>Here you can add more details about the user or include additional sections if needed.</Text>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};



