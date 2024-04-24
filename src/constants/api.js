import axios from 'axios'

const api = axios.create({
<<<<<<< HEAD
// baseURL: 'https://emsweb.unitdtechnologies.com:4014',
=======
//baseURL: 'https://emsweb.unitdtechnologies.com:4014',
>>>>>>> fc9cc06243b7afe455df5c1a050ec741af54a328
baseURL: 'http://localhost:5009',
});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api