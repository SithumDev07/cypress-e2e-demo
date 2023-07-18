import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

class AuthServices  {
    
    login = async (data) => {
        let a = new Promise((resolve, reject)=>{
            axios
                .post(apiroutes.LOGIN, data)
                .then((res)=> {
                    console.log(res)
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    logout = () => {
        try{
            LocalStorageServices.removeItem('user')
            LocalStorageServices.removeItem('token')
            LocalStorageServices.removeItem('myStudent')
        }catch(err){
            console.log(err)
        }
    }
}

export default new AuthServices();