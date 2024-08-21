import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

export const Signup = () => {
  // Form submission handler
  const onFinish = (values) => {
    console.log('Received values from form:', values);
    // Handle signup logic here (e.g., send data to the backend)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
          Create an Account
        </h2>
        <Form
          name="signup"
          onFinish={onFinish}
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
    // Form submission handler
    const onFinish = (values) => {
      console.log('Received values from form:', values);
      // Handle login logic here (e.g., send data to the backend)
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
  