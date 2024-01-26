import axios from "axios";
const API_BASE_URL = "https://my-blog-beta-green.vercel.app"
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return await response.json();
    }else if(response.status === 409){
      return{
        error: 'User already exists',
        statusCode: 409,
      }
    } else {
      console.error("Error creating user:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

//Login API Function
export const Login = async (checkUser) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkUser),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return {
        user: responseData.user,
        statusCode: 200,
      };
    }else if(response.status === 404){
      return{
        error: 'Fill the requirements',
        statusCode: 404,
      }
    }
    else if (response.status === 401){
      return{
        error: 'Invalid Username or Password',
        statusCode: 401,
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    return {
      error: 'An unexpected error occurred',
      statusCode: 500,
    };
  }
};

export const checkUserExist = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: email })
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return {
        userId: responseData.userId,
        statusCode: 200,
      };
    }else if(response.status === 404){
      return{
        error: 'User Not Found',
        statusCode: 404,
      }
    }
  } catch (error) {
    console.error('Error while changing password:', error);
    return {
      error: 'An unexpected error occurred',
      statusCode: 500,
    };
  }
};


export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error creating post:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    return await response.json();
  } catch (error) {
    console.error("Error getting users:", error);
  }
};

export const getModifiedUser = async (userId) => {
  if(userId){
    try {
      const response = await axios.get(`${API_BASE_URL}/modifieduser/${userId}`);
      return await response.data
    } catch (error) {
      console.error(`Error getting user with ID ${userId}:`, error);
    }
  }
};

export const getSpecificPost = async (postId) => {
  if(postId){
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
      return await response.data
    } catch (error) {
      console.error(`Error getting post with ID ${postId}:`, error);
    }
  }
};

export const getPost = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return await response.json();
  } catch (error) {
    console.error("Error getting posts:", error);
  }
};

export const updateUser = async (requestData,userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update post (status ${response.status})`);
    }
    return {
      "statusCode" : 200
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
