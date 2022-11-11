import * as httpRequest from '~/utils/httpRequest';

export const signUp = async (body, options={}) => {
    try {
        const response = await httpRequest.post('/auth/signup', body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const signIn = async (body, options = {}) => {
    try {
        const response = await httpRequest.post('/auth/signin', body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const signOut = async () => {
    try {
        const response = await httpRequest.post('/auth/signout');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getUserInfo = async (userId) => {
    try {
        const response = await httpRequest.get('/user/profile', {
            params: {
                userId,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserList = async (userId) => {
    try {
        const response = await httpRequest.get('admin/user/list');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const updateUserInfo = async (body, userId, options = {}) => {
    try {
    
        const response = await httpRequest.post(`/user/profile/update?userId=${userId}`, body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const changePassword = async (body) => {
    try {
        console.log({body});
        const response = await httpRequest.post(`/change-password`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

