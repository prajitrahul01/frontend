
export const FETCH_SHOP = "FETCH_SHOP"

const fetchShopAction = (shopData) => {
    return (
        {
            type: FETCH_SHOP,
            payload: shopData
        }
    )
}
export const fetchData1 = () => {
  console.log('fetchData');
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json'
      };
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
      
      const response = await fetch('http://localhost:4000/api/category/', {
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response: ', data);
      dispatch(fetchShopAction(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

  