import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const signUp = async (formData) => {

  try {


    const data = new FormData();
    
    // userInfo 부분 추가
    const userInfo = { ...formData };
    delete userInfo.file;  // file 정보는 별도로 처리
    data.append('userInfo', JSON.stringify(userInfo));
    
    // 파일 추가
    if (formData.file) {
      data.append('file', formData.file);
    }

    console.log(data.get('file'));
    

    const response = await axios.post(`${SpringbaseUrl}/users/sign-up`, 
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    

    // 응답 데이터와 함께 저장
    const signUpData = response.data;

    return signUpData;
  } catch (error) {
    console.error('빈칸 있음:', error.response?.data || error.message);
    throw error;
  }



  
};

