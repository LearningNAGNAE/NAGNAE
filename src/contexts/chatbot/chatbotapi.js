async function fetchData() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api.example.com/web_page_mark/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ limit: 1000 })
      });
  
      if (!response.ok) {
        throw new Error('Permission error');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // 오류를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
    }
  }
  
  export default fetchData;
  