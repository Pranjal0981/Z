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
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(asyncCurrentUser());
    }, [dispatch, user?._id]);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        ); // Loading spinner
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <Card
                title={<Title level={2} className="text-center text-gray-800">User Profile</Title>}
                bordered={false}
                className="shadow-lg rounded-lg"
                style={{ backgroundColor: '#f8f9fa' }}
            >
                <Row justify="center" style={{ marginBottom: '20px' }}>
                    <Col>
                        <Avatar
                            size={120}
                            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" // Placeholder avatar
                            className="mb-4 shadow-md"
                        />
                    </Col>
                </Row>
                <Row gutter={[24, 24]} className="mb-6">
                    <Col span={12}>
                        <Title level={4} className="text-indigo-600">User Information</Title>
                        <div className="mb-4">
                            <Text strong className="text-gray-600">Email:</Text> <Text>{user.email}</Text>
                        </div>
                        <div className="mb-4">
                            <Text strong className="text-gray-600">First Name:</Text> <Text>{user.firstName || 'N/A'}</Text>
                        </div>
                        <div className="mb-4">
                            <Text strong className="text-gray-600">Last Name:</Text> <Text>{user.lastName || 'N/A'}</Text>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Title level={4} className="text-indigo-600">Account Details</Title>
                        <div className="mb-4">
                            <Text strong className="text-gray-600">User ID:</Text> <Text>{user._id}</Text>
                        </div>
                        <div className="mb-4">
                            <Text strong className="text-gray-600">Joined:</Text> <Text>{new Date(user.createdAt).toLocaleDateString()}</Text>
                        </div>
                        <div className="mb-4">
                            <Text strong className="text-gray-600">Status:</Text> <Text>{user.status || 'Active'}</Text>
                        </div>
                    </Col>
                </Row>
                <Divider />
              
            </Card>
        </div>
    );
};


