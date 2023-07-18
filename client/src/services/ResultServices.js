import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');

class ResultServices  {
    
    addResult = async (data) => {
        let a = new Promise((resolve, reject)=>{
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            axios
                .post(apiroutes.ADD_RESULT, data, config)
                .then((res)=> {
                    return resolve(res)
                })
                .catch((err)=>{
                    return resolve(err.response)
                })
        })
        return await a
    }

    getAllAssignmentIdsOfClass = async (params) => {
        const accessToken = LocalStorageServices.getItem('token');
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.GET_ALLEXAMS,{
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
    
    getAllResultsOfAssignment = async (params) => {
        const accessToken = LocalStorageServices.getItem('token');
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.GET_EXAMSRESULT,{
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

    getAllResultsOfAssignmentForParentView = async (params) => {
        const accessToken = LocalStorageServices.getItem('token');
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.GET_STUDENTRESULT,{
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

export default new ResultServices();