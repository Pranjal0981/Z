import { removeUser, saveUser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch, getState) => {
    try {
        // Retrieve token and token expiration time from localStorage
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        // Check if token is expired or not available
        if (!token || tokenExpiration < Date.now()) {
            // If token is not found or expired, dispatch an action to clear the current user
            dispatch(saveUser(null));
            return;
        }

        // Make a request to fetch the current user using the token
        const response = await axios.post('/user/currentUser', null, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Dispatch action to save the current user in the Redux store
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
    }
};

export const asyncSignupUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('/user/signup', data);
        console.log(response);
        dispatch(saveUser(response.data));
        toast.success("SignUp Successfully !")
    } catch (error) {
        console.error(error);
        toast.error('Email Already exist.');
    }
};


export const asyncSignIn = (data) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/user/login', data);
        const expiresInMilliseconds = response.data.expiresIn;

        // Calculate token expiration time
        const expirationTime = Date.now() + expiresInMilliseconds;

        // Save token and expiration time in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', expirationTime);

        // Dispatch action to save token expiration in Redux store
        await dispatch(saveTokenExpiration(expirationTime));

        // Fetch current user after successful login
        dispatch(asyncCurrentUser());

        toast.success("LoggedIn Successfully !");
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
};

export const asyncSignOut=(navigate)=>async(dispacth,getState)=>{
    try {
        const response=await axios.get('/user/logout')
        dispacth(removeUser())
        toast.success("Logout Successfully !")
        navigate('/')
    } catch (error) {
        console.log(error)

    }
}
