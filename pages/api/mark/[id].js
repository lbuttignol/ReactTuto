import { useSelector, useDispatch } from 'react-redux'
import { markSquare, jumpTo } from '../../../redux/reducer'

export default (req, res) => {
  const {
    query: { id },
  } = req
  
  // search into database the game id
  // mark square
  // Return game

  res.status(200).json({ name: 'John Doe', value: id });
}