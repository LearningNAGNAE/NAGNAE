import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const signUp = async (formData) => {
  console.log(formData, "fdsgfsdgsfdghdfojiu");
  try {
    const response = await axios.post(`${SpringbaseUrl}/users/sign-up`, 
      formData,
      { headers: { 'Content-Type': 'application/json' } }
    );
    

    // 응답 데이터와 함께 저장
    const signUpData = response.data;

    return signUpData;
  } catch (error) {
    console.error('빈칸 있음:', error.response?.data || error.message);
    throw error;
  }
};

