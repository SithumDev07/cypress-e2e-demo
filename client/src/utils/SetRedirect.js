import axios from 'axios'

import { useNavigate } from 'react-router-dom';


const SetRedirect  = () => {
    let navigate = useNavigate(); 
    
    const redirect = () => {
        navigate('/')
        console.log("done")
        // setTimeout(() => {
        // },1000)

    }
    redirect()
}

export default SetRedirect


