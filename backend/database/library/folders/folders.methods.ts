// Dependencies

// interface typing
import { IFoldersAttributes, IInsertedFolder, INewFolderInstance,
          IGetFoldersList
   } from './folders.types';
import { IRequestDescription } from '../../types';

// App file
import { FolderModel } from '../../database';

export const createFolder = async (newFolderProps: IFoldersAttributes): Promise<IInsertedFolder>  => {
  
  const requestDescription: IRequestDescription = {
    description: `insert new folder in the database.`,
    argument: newFolderProps,
  };

  try {
    const newFolderInstanceInserted: INewFolderInstance  = await FolderModel.create(newFolderProps);

    return {
      error: false,
      request_description: requestDescription,
      new_folder: newFolderInstanceInserted?.dataValues,
    }

  } catch (error) {
    return {
      error: true,
      request_description: requestDescription,
      message_error: error,
    };
  };
};

export const getFoldersList = async (): Promise<IGetFoldersList> => {
  
  const requestDescription: IRequestDescription = {
    description: `get list of the folders.`,
    argument: null,
  };

  try {
    const foldersList: any = await FolderModel.findAll();

    return {
      error: false,
      request_description: requestDescription,
      list_folders: foldersList,
    };

  } catch (error) {
    return {
      error: true,
      request_description: requestDescription,
      message_error: error,
    };
  };
}
