import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');

class ParentServices  {
    
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


    getAllParents = async (id) => {
        let a = new Promise((resolve, reject)=>{
            
            axios
                .get(apiroutes.GET_ALL_PARENTS
                    ,{
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
    
    getParentStudents = async () => {
        const accessToken = LocalStorageServices.getItem('token');
        console.log("accdsesd",accessToken)
        
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.GET_STUDENTS_OF_SINGLE_PARENT,{
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

    setMyStudent = (id) => {
        LocalStorageServices.setItem('myStudent',id)
    }
    
    removeMyStudent = (id) => {
        LocalStorageServices.removeItem('myStudent')
    }
}

export default new ParentServices();