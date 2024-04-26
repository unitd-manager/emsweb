import axios from 'axios'

const api = axios.create({
<<<<<<< HEAD
//baseURL: 'https://emsweb.unitdtechnologies.com:4014',
baseURL: 'http://localhost:5009'
=======
// baseURL: 'https://emsweb.unitdtechnologies.com:4014',
baseURL: 'http://localhost:5009',
>>>>>>> 9819bd79cc24d065385e4def6a9c0531ac8cfef9
});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api