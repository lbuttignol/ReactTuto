import { v4 as uuidv4 } from 'uuid';

export default (req, res) => {
  const id =  uuidv4();
  res.status(200).json({gameId: id});
}