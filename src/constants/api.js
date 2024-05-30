import axios from 'axios'

const api = axios.create({
//baseURL: 'https://emsweb.unitdtechnologies.com:4014',
baseURL: 'http://localhost:5009'
});




export default api