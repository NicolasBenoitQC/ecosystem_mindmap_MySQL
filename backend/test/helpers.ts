/* import { UniteTestDbConnection } from '../database/database';


export async function deleteAllRow ():  Promise<any>  {
    
    const requestType = `Delete all row` ;

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "DELETE FROM cells_properties";

            UniteTestDbConnection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        //console.log(response);
        return {
            request_type: requestType,
            error: false, 
            update_Cell: response,
        };

    } catch (error) {
        console.log(error);
        return {
            request_type: requestType,
            error: true,
            message: error,
        }  
    }
} */