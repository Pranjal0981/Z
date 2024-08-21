import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EyeOutlined />}>
        <Link to="/view-posts">View Posts</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<EditOutlined />}>
        <Link to="/publish-post">Publish Post</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<LogoutOutlined />}>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold tracking-wider">
          <Link to="/">MyApp</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/profile">
            <Button type="text" className="text-white hover:bg-indigo-500">
              <UserOutlined /> Profile
            </Button>
          </Link>
          <Link to="/view-posts">
            <Button type="text" className="text-white hover:bg-indigo-500">
              <EyeOutlined /> View Posts
            </Button>
          </Link>
          <Link to="/publish-post">
            <Button type="text" className="text-white hover:bg-indigo-500">
              <EditOutlined /> Publish Post
            </Button>
          </Link>
          <Link to="/logout">
            <Button type="text" className="text-white hover:bg-indigo-500">
              <LogoutOutlined /> Logout
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" className="text-white">
              Menu <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
