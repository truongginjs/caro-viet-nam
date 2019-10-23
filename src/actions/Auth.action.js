import axios from 'axios';
import { decode } from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from '../constants/action-types';

export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

export const handleLogout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}))
    }
}

export const handleLogin = (data) => {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_HOST_API_LOGIN, data)
            .then((result) => {
                const { token } = result.data;
                if (token) {
                    localStorage.setItem('jwtToken', token);
                    setAuthToken(token);
                    dispatch(setCurrentUser(decode(token)))
                }
            })
    }
}

export const handleRegister = (data)=>{
    return dispatch=>{
        return axios.post(process.env.REACT_APP_HOST_API_REGISTER,data).then(result=>{
            const { token } = result.data;
                if (token) {
                    localStorage.setItem('jwtToken', token);
                    setAuthToken(token);
                    dispatch(setCurrentUser(decode(token)))
                }
        })
    }
}