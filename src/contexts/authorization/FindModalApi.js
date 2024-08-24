import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const sendEmailId = async (emailData) => {
    // console.log(emailData);
  try {
    const response = await axios.post(`${SpringbaseUrl}/users/send-email-id`, 
        emailData, 
        { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendEmailPw = async (emailData) => {
    console.log(emailData);
  try {
    const response = await axios.post(`${SpringbaseUrl}/users/send-email-pw`, 
        emailData,
        { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};