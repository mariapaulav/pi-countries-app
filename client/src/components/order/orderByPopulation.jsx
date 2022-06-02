import { useDispatch } from "react-redux"
import { orderByPopulation } from "../../store/actions"

export default function OrderByPopulation(){

    const dispatch = useDispatch()

    function onSelectChange(e){
        dispatch(orderByPopulation(e.target.value))
    }

   return (
       <div> 
       <label htmlFor="select">Order by Population</label>
        <select name="select" defaultValue={'DEFAULT'} onChange={onSelectChange}>
        <option value='DEFAULT' disabled defaultValue> All</option>
            <option value='MIN'>MIN</option>
            <option value='MAX'>MAX</option>
        </select>
        </div>
        )
}
