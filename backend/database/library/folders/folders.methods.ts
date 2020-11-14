// Dependencies

// interface typing
import { ICreatedFolder, IFoldersAttributes } from './folders.types';

// App file
import { FolderModel } from '../../database';

export const createFolder = async (newFolder: IFoldersAttributes) => {
  const jane = FolderModel.build(newFolder);
  try {
    const newFolder: ICreatedFolder = await jane.save();
    console.log('Created folder : ', newFolder.dataValues);
    return newFolder;
  } catch (error) {
    console.error(`Can't create user : `, error);
  };
};


