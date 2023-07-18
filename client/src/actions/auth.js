import axios from 'axios';
import * as apiroutes from '../apiroutes'
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

export const register = (data) => async ( dispatch) => {
    console.log('res')

    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post(apiroutes.CREATE_USER, data, config);
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res
        });
                        console.log('res')
        
    }catch(err){
        dispatch({
            type : REGISTER_FAIL,
        });
        console.log('res')
    }

}

  