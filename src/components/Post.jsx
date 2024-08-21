import { Form, Input, Button,Col,Row,Spin, Card, Typography, message } from 'antd';
import 'antd/dist/reset.css';;
import { asyncCreateNewPost, asyncDeletePostById, asyncUpdatePostById, asyncViewPostById, asyncViewPosts } from '../store/actions/postAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const { Title, Paragraph } = Typography;
const { TextArea } = Input;




export const ViewPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, loading, error } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(asyncViewPosts());
    }, [dispatch]);

    const handleDelete = (id) => {
        // Confirm before deleting
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if (confirm) {
            dispatch(asyncDeletePostById(id));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        ); // Loading spinner
    }

    if (error) {
        message.error('Failed to load posts.'); // Error toast notification
        return null;
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <Title level={2} className="text-center mb-4">All Posts</Title>
            <Row gutter={16}>
                {posts && posts.length > 0 ? (
                    posts.map(post => (
                        <Col key={post._id} xs={24} sm={12} md={8} lg={6} className="mb-4">
                            <Card
                                hoverable
                                className="shadow-md rounded-md"
                                actions={[
                                    <Button type="link" href={`/view-post/${post._id}`}>View</Button>,
                                    <Button type="link" href={`/update-post/${post._id}`}>Update</Button>,
                                    <Button type="link" danger onClick={() => handleDelete(post._id)}>Delete</Button>
                                ]}
                            >
                                <Title level={4}>{post.title}</Title>
                                <Paragraph ellipsis={{ rows: 2, expandable: true }}>{post.excerpt}</Paragraph>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <Card>
                            <Title level={4}>No Posts Available</Title>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};




export const ViewPostById = () => {
    const { id } = useParams(); // Get id from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, loading, error } = useSelector(state => state.post);

    useEffect(() => {
        if (id) {
            dispatch(asyncViewPostById(id));
        }
    }, [dispatch, id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        if (id) {
            // Confirm before deleting
            const confirm = window.confirm('Are you sure you want to delete this post?');
            if (confirm) {
                dispatch(asyncDeletePostById(id, navigate));
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        ); // Loading spinner
    }

    if (error) {
        message.error('Failed to load post.'); // Error toast notification
        return null;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Card
                className="shadow-lg rounded-lg"
                actions={[
                    <Button type="primary" onClick={handleBack}>Back</Button>,
                    <Button type="link" href={`/update-post/${id}`}>Edit</Button>,
                    <Button type="link" danger onClick={handleDelete}>Delete</Button>,
                ]}
            >
                <Title level={2} className="text-center mb-4">{posts?.title || 'Post Title'}</Title>
                <Paragraph className="mb-4">
                    {posts?.content || 'Post content goes here...'}
                </Paragraph>
            </Card>
        </div>
    );
};




export const PublishPost = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {user,isAuth}=useSelector((state)=>state.user)

    const onFinish = async(values) => {
        // Dispatch the async action to create a new post
      await  dispatch(asyncCreateNewPost(values,user._id))
         
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Form submission failed:', errorInfo);
        message.error('Failed to publish post. Please check your inputs.');
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <Card className="shadow-lg rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                <Title level={2} className="text-center text-indigo-600">Publish New Post</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ title: '', excerpt: '', content: '' }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter the title' },
                            { max: 100, message: 'Title cannot be more than 100 characters' },
                        ]}
                    >
                        <Input placeholder="Enter the title" />
                    </Form.Item>

                    <Form.Item
                        label="Excerpt"
                        name="excerpt"
                        rules={[
                            { required: true, message: 'Please enter an excerpt' },
                            { max: 200, message: 'Excerpt cannot be more than 200 characters' },
                        ]}
                    >
                        <Input placeholder="Enter a short summary of the post" />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the content' }]}
                    >
                        <TextArea rows={6} placeholder="Enter the main content of the post" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Publish Post
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};


export const UpdatePost = () => {
    const { id } = useParams(); // Get postId from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    // Get the post data and current user info from the state
    const { posts, loading, error } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user); // Assuming you have an auth slice with the current user

    useEffect(() => {
        if (id) {
            dispatch(asyncViewPostById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (posts) {
            form.setFieldsValue({
                title: posts.title,
                content: posts.content,
                excerpt: posts.excerpt, // Add the excerpt field
            });
        }
    }, [posts, form]);

    const onFinish = async (values) => {
        if (user && posts && user._id && posts.userId) {
            if (user._id.toString() === posts.userId.toString()) {
                await dispatch(asyncUpdatePostById(id, values, navigate));
            } else {
                message.error('You are not authorized to update this post.');
            }
        } else {
            message.error('Post or user data is missing.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        ); // Loading spinner
    }

    if (posts && user && user._id && posts.userId && user._id.toString() !== posts.userId.toString()) {
        message.error('You are not authorized to update this post.');
        return null; // Or navigate to an error page
    }

    if (error) {
        message.error('Failed to load post.'); // Error toast notification
        return null;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-center mb-4">Update Post</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    title: posts?.title,
                    content: posts?.content,
                    excerpt: posts?.excerpt, // Initialize the excerpt field
                }}
                className="shadow-lg rounded-lg p-4 bg-white"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter the post title' }]}
                >
                    <Input placeholder="Enter post title" />
                </Form.Item>

                <Form.Item
                    name="excerpt"
                    label="Excerpt"
                    rules={[{ required: true, message: 'Please enter the post excerpt' }]}
                >
                    <TextArea rows={2} placeholder="Enter post excerpt" />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please enter the post content' }]}
                >
                    <TextArea rows={6} placeholder="Enter post content" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Update Post
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export const DeletePost=()=>{
    return<>
    
    </>
}