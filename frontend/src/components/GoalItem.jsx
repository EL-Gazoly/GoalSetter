import {useDispatch} from 'react-redux'
import {FaTimes} from 'react-icons/fa'
import {deleteGoal} from '../features/goals/goalSlice'
function GoalItem({goal}) {
    const dispatch=useDispatch()
  return (
    <div className="goal">
    <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
    </div>
    <h2>{goal.text}</h2>
    <FaTimes style={{color:'red', cursor:'pointer'}}onClick={()=>dispatch(deleteGoal(goal._id))} className="close"/>
    </div>
  )
}
 
export default GoalItem