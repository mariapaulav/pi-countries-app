import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByActivity, getActivities } from "../../store/actions"

export default function OrderActivity({setCurrentPage}){
    const activ = useSelector((state)=> state.activities)
    const dispatch = useDispatch()

    function onSelectChange(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1) // para que vaya a la pag 1 
    }

    useEffect(()=> {
        dispatch(getActivities())
    },[dispatch])

   return (
       <div> 
       <label htmlFor="select">Filter by Activity</label>
        <select name="select" defaultValue={'DEFAULT'} onChange={onSelectChange}>
        <option value='DEFAULT' disabled defaultValue> All</option>
            {activ && activ.map(a => {
                return (
                    <option value={a.name}>{a.name}</option>
                )})}
        </select>
        </div>
        )
}
