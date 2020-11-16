// Dependencies

// interface typing
import { IFilesAttributes, IInsertedFile, INewFileInstance,
    IGetFilesList,
} from './files.types';
import { IRequestDescription } from '../../types';

// App file
import { FileModel } from '../../database';

export const createFile = async (newFileProps: IFilesAttributes): Promise<IInsertedFile>  => {

    const requestDescription: IRequestDescription = {
    description: `insert new file in the database.`,
    argument: newFileProps,
    };

    try {
        const newFileInstanceInserted: INewFileInstance  = await FileModel.create(newFileProps);

        return {
        error: false,
        request_description: requestDescription,
        new_file: newFileInstanceInserted?.dataValues,
        }

    } catch (error) {
        
        return {
        error: true,
        request_description: requestDescription,
        message_error: error
        };
    };
};

export const getFilesList = async (): Promise<IGetFilesList> => {
  
    const requestDescription: IRequestDescription = {
      description: `get list of the files.`,
      argument: null,
    };
  
    try {
      const filesList: any = await FileModel.findAll();
  
      return {
        error: false,
        request_description: requestDescription,
        list_files: filesList,
      };
  
    } catch (error) {
      return {
        error: true,
        request_description: requestDescription,
        message_error: error,
      };
    };
};
