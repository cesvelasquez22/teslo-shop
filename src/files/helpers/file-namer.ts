import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, filename: string) => void,
) => {
  const fileExt = file.mimetype.split('/')[1];
  const filename = `${uuid()}.${fileExt}`;

  return callback(null, filename);
};
