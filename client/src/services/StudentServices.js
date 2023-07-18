import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

const accessToken = LocalStorageServices.getItem('token');

class StudentServices  {

    getAllStudents = async (id) => {
        let a = new Promise((resolve, reject)=>{
            
            axios
                .get(apiroutes.GET_ALL_STUDENTS,
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

export default new StudentServices();