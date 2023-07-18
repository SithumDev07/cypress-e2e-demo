import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');

class NotificationServices  {
    
    createAnnoucement = async (data) => {
        let a = new Promise((resolve, reject)=>{
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            axios
                .post(apiroutes.CREATE_NOTIFICATION, data, config)
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    createEarlyLeaveNotification = async (data) => {
        let a = new Promise((resolve, reject)=>{
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            axios
                .post(apiroutes.CREATE_EARLY_LEAVE_NOTIFICATION, data, config)
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    getNotifications = async (params) => {
        const accessToken = LocalStorageServices.getItem('token');
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.NOTIFICATION,{
                    headers : {
                        'x-auth-token': `${accessToken}`
                    },
                    params:params 
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

export default new NotificationServices();