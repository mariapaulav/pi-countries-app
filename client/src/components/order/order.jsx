import { useDispatch } from "react-redux"
import { orderByName } from "../../store/actions"
import './order.css'

export default function Order(){

    const dispatch = useDispatch()

    function onSelectChange(e){
        dispatch(orderByName(e.target.value))
    }

   return (
       <div> 
       <label  htmlFor="select">Order by name</label>
        <select className="select-selected " name="select" defaultValue={'DEFAULT'} onChange={onSelectChange}>
        <option value='DEFAULT' disabled defaultValue> All</option> {/* ME RECOMIENDA LA CONSOLA USAR DELFAULTVALUE PERO NO QUIERE ACEPTARMLEO  */}
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
        </select>
        </div>
        )

}




