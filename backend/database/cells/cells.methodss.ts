import { DbConnection } from '../database';

export async function getAllCells () {

    const requestType = 'Get All cell(s)';

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM cells_properties;";

            DbConnection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        console.log(response)
        return response;

    } catch (error) {
        return {
            request_type: requestType,
            error: true,
            message: error,
        }
    }

};

export async function getCellsByPropsIdStemCell (id: number) {

    const requestType = 'Get cell(s) by idStemCell.';

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM cells_properties WHERE idStemCell = ?";

            DbConnection.query(query, [id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        console.log(response)
        return response;

    } catch (error) {
        return {
            request_type: requestType,
            error: true,
            message: error,
        }
    }

};

export async function newCell (title: string, description: string, 
    position: number, idStemCell: number,stemCell?: boolean ) {

    const requestType = 'Create new Cell.';

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = `
            INSERT INTO cells_properties 
            (title, description,position, idStemCell)  
             
            VALUES (?,?,?,?);`;

            DbConnection.query(query, [title, description, position, idStemCell], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });
        console.log(response);
        return {
            request_type: requestType,
            error: false, 
            cells_Request: response,
        };

    } catch (error) {
        console.log(error);
        return {
            request_type: requestType,
            error: true,
            message: error,
        }  
    }

};

export async function updatePropsCellById (cellUpdated:any):  Promise<any>  {
    
    const requestType = 'update props cell';

    try {
        const response:any = await new Promise((resolve, reject) => {
            const query = "UPDATE cells_properties SET title=?, description=?, position=?, idStemCell=? WHERE id = ?";

            DbConnection.query(query, [cellUpdated.title, cellUpdated.description, 
                                        cellUpdated.position, cellUpdated.idStemCell, 
                                        cellUpdated.id], (err, results) => {
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
}
