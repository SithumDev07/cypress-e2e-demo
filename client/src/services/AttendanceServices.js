import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');
class AttendanceServices  {
    
    markAttendance = async (data) => {
        let a = new Promise((resolve, reject)=>{
            // console.log('test')
            axios
                .post(apiroutes.MARK_ATTENDANCE,data,{
                    headers : {
                        'x-auth-token': `${accessToken}`
                    },
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

    showAttendance = async (class_ID,date) => {
        let a = new Promise((resolve, reject)=>{
            // console.log('test')
            axios
                .get(apiroutes.SHOW_ATTENDANCE+ `/${class_ID}`+ `/${date}`,{
                    headers : {
                        'x-auth-token': `${accessToken}`
                    },
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

    getStudentAttendance = async (params) => {
        let a = new Promise((resolve, reject)=>{
            // console.log('test')
            axios
                .get(apiroutes.GET_ATTENDANCE,{
                    headers : {
                        'x-auth-token': `${accessToken}`
                    },
                    params : params
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

export default new AttendanceServices();