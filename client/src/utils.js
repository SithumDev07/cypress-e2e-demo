import { useNavigate } from 'react-router-dom';

let navigate; 


const Utils = () => {
    navigate = useNavigate();
    
    const handleRedirect  = (route) => {
        setTimeout(() => {
            console.log("done")
            navigate(route)
        },5000)
    }
    
    
}

export default new Utils ();
