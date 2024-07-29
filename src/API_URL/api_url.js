const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';


export const API_URL={
    REGISTER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,
    DEPARTMENT:'http://localhost:3000/api/department/',
    EMPLOYEE:'http://localhost:3000/api/employee/',
    PROFILEPHOTO:'http://localhost:3000/api/fileupload/',
    photosPath :`http://localhost:3000/profile/`,


    REGISTER:'http://localhost:3000/api/register/',
    LOGIN:'http://localhost:3000/api/login/',
    
}