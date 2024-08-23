import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const modifyAccount = async (formData) => {
  const token = sessionStorage.getItem('token')

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
    
    await axios.put(`${SpringbaseUrl}/users/modify-account`, 
      data,
      { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } }
    );
    console.log("=======================");
    console.log(token);
    console.log("=======================");
    const loginuserinfo = await axios.post(`${SpringbaseUrl}/users/one-user-info`, 
      {userno: userInfo.userno},
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
    );
    const newUserData = loginuserinfo.data;
    sessionStorage.setItem('userData', JSON.stringify(newUserData));
    
    // 응답 데이터와 함께 저장
    const loginuserInfoData = loginuserinfo.data;

    return {loginuserInfoData};
  } catch (error) {
    console.error('빈칸 있음:', error.response?.data || error.message);
    throw error;
  }



  
};

