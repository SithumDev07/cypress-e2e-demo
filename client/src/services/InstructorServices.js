import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');
class InstructorServices  {
    
    createUser = async (data) => {
        let a = new Promise((resolve, reject)=>{
            
            axios
                .post(apiroutes.CREATE_USER, data)
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    getClasses = async (id) => {
        let a = new Promise((resolve, reject)=>{
            // let currentUser = LocalStorageServices.getItem('user')
            // let id = JSON.parse(currentUser).id
            // console.log("currentUser",id)
            axios
                .get(apiroutes.GET_CLASSE_FOR_INSTRUCTOR + `/${id}` 
                    ,{
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    } 
                )
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }
    
    getClassesForAttendance = async (id) => {
        let a = new Promise((resolve, reject)=>{
            
            axios
                .get(apiroutes.GET_CLASSE_FOR_INSTRUCTOR + `/${id}`,
                    {
                        headers: {
                            'x-auth-token': `${accessToken}`
                        }
                    } 
                )
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }
    
    getAllInstructors = async (id) => {
        let a = new Promise((resolve, reject)=>{
            
            axios
                .get(apiroutes.GET_ALL_INSTRUCTORS,
                    {
                        headers: {
                            'x-auth-token': `${accessToken}`
                        }
                    } 
                )
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    getClassFeesForInstructor = async (params) => {
        const accessToken = LocalStorageServices.getItem('token');
        console.log("accdsesd",accessToken)
        
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.CLASS_FEES_INSTRUCTOR,{
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




export default new InstructorServices();