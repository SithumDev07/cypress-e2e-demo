import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');

class UserServices  {
    
    createUser = async (data) => {
        let a = new Promise((resolve, reject)=>{
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            axios
                .post(apiroutes.CREATE_USER, data, config)
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    userProfile = async () => {
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.USER_PROFILE, {
                    headers : {
                        'x-auth-token': `${accessToken}`
                    }
                })
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }
}

export default new UserServices();