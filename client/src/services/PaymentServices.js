import axios from 'axios';
import * as apiroutes from '../apiroutes'
import LocalStorageServices from './LocalStorageServices';

// const accessToken = LocalStorageServices.getItem('token');

class PaymentServices  {
    
    getInstitutePaymentsForInstructor = async (id) => {
        const accessToken = LocalStorageServices.getItem('token');
        let a = new Promise((resolve, reject)=>{
            axios
                .get(apiroutes.GET_INSTITUTE_INSTRUCTOR_PAYMENTS+`/${id}`,{
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
    
}

export default new PaymentServices();