import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import scss from './UseRequest.module.scss';

export default ({ url, method, body, onSuccess }) => {

    const [errors, setErrors] = useState(null);

    const doRequest = async(props = {}) => {
    
        try{
            setErrors(null);
            const response = await axios[method](url, 
                { ...body, ...props }
            );

            if (onSuccess) {
                onSuccess(response.data)
            }
            
            return response.data;
        }catch(err){
            setErrors(
                <Box 
                    className={scss.errors}
                >
                    <h4>Oops..</h4>
                    <ul>
                      {err.response.data.errors.map(err => (
                        <li key={err.message}>{err.message}</li>
                      ))}
                    </ul>
                </Box>
            );

        }
    }

    return { doRequest, errors };
}