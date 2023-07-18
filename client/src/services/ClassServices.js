import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';


const accessToken = LocalStorageServices.getItem('token');
class ClassServices  {
    

    
    createClass = async (data) => {
        let a = new Promise((resolve, reject)=>{
            console.log('test')
            axios
                .post(apiroutes.CREATE_CLASS, data)
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    getAllClasses4FE = async (params) => {
        let a = new Promise((resolve, reject)=>{
            console.log('test')
            axios
                .get(apiroutes.CREATE_CLASS,{
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

    myClasses = async (id) => {
        let a = new Promise((resolve, reject)=>{
            console.log('STUDENT_MY_CLASSES')
            axios
                .get(apiroutes.STUDENT_MY_CLASSES+ `/${id}`,
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

    myClassStudents = async (id) => {
        let a = new Promise((resolve, reject)=>{
            console.log('STUDENT_MY_CLASSES')
            axios
                .get(apiroutes.GET_ALL_STUDENTS_OF_A_CLASS+ `/${id}`,
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

    classPayment = async (data) => {
        let a = new Promise((resolve, reject)=>{
            console.log('test')
            axios
                .post(apiroutes.CLASS_PAYMENT, data
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

    getMonthlyPaymentsOfStudent = async (classId,studentId) => {
        let a = new Promise((resolve, reject)=>{
            console.log('test')
            axios
                .get(apiroutes.CLASS_PAYMENT + `/${classId}` +"/student" + `/${studentId}`,
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
}

export default new ClassServices();