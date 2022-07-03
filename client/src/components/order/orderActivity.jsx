import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByActivity, getActivities } from "../../store/actions"
import './orderActivity.css'
export default function OrderActivity({setCurrentPage, currentPage}){
    
    const activs = useSelector((state)=> state.activities)
    const dispatch = useDispatch()
    

    useEffect(()=> {
        dispatch(getActivities())
    },[dispatch])

    function onSelectChange(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
        if (currentPage > 1) setCurrentPage(1);
    }


   return (
       <div className="font"> 
       <label htmlFor="select">Filter by Activity  </label>
        <select  className="select-selected"  name="select" defaultValue={'DEFAULT'} onChange={onSelectChange}>
        <option value='DEFAULT' disabled defaultValue> All</option>
            {activs && activs.map(a => {
                return (
                    <option key={a.name} value={a.name}>{a.name}</option>
                )})}
        </select>
        </div>
        )
}
