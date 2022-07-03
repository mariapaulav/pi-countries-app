import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  getCountries } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { postActivity } from '../../store/actions';
import './addActivity.css'
import Header from '../header/header';
import swal from 'sweetalert';


function validate (input){
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required!';
      } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
        errors.name = 'Name must contain only letters!';
      }

    if (!input.difficulty) {
        errors.difficulty = 'Difficulty between 1 and 5 is required!';
      } else if (input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = "Difficulty must be between 1 and 5!";
      }
    
      if (!input.duration) {
        errors.duration = 'Duration in hours is required!';
      } else if (input.duration < 1 || input.duration > 12) {
        errors.duration = "Duration must be between 1 and 12!";
      }
    
      if (!input.season) {
        errors.season = "Season is required!";
      }
    
      if (!input.countries) {
        errors.countries = "Country is required!";
      } else if (!input.countries.length) {
        errors.countries = "Country is required!";
      }
    //   console.log(input, 'input');
    //   console.log(errors,'errors');

    return errors
}

export default function AddActivity (){
    const dispatch = useDispatch()
    const countriees = useSelector((state) => state.countries);
    // usehistory es un metodo del reouter que me redirige a la ruta que yo le diga
    const history = useHistory()

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season:'',
        countries: []
    })

    useEffect(()=> {
        dispatch(getCountries())
    },[dispatch])

    // manejando cada vez que cambien o se modifiquen mis inputs
    function handleChange(e){
        setInput({
            ...input,
            name: e.target.value
        });
        setErrors(validate({
            ...input,
            name: e.target.value
        }));
    }

    function handleChangeDifficulty(e){
        setInput({
            ...input,
            difficulty : e.target.value
        });
        setErrors(validate({
            ...input,
            difficulty: e.target.value
        }));
    }
    function handleChangeDuration(e){
        setInput({
            ...input,
            duration: e.target.value
        });
        setErrors(validate({
            ...input,
            duration: e.target.value
        }));
    }
    // agregando un arreglo de todo lo que seleccione en el select
    function handleSelectSeason(e){
        setInput({
            ...input,
            season: e.target.value
        });
        setErrors(validate({
            ...input,
            season: e.target.value
        }));
    }

    // const countryValidator = (countryName) =>{
    //     //console.log(countryName,'countryname');
    //     return [...input.countries].filter((e) => e === countryName)
    // }

    function handleSelectCountries(e){
        e.preventDefault()

        if(Object.values(input.countries).includes(e.target.value)){
            swal({
                title: "Oops",
                text: "Country Already Selected",
                icon: "error",
                className: "red-bg",
            });
        }else{
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            });
        }
        setErrors(validate({
            ...input,
            countries: e.target.value
        }));
    }
   

    function handleSubmit(e){
        e.preventDefault();
        console.log(input, 'handle')
        if(Object.values(validate(input)).length){
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }));
            swal({
                title: "Oops",
                text: "Missing information",
                icon: "error"
            });
            history.push('/createactivity')
        }else {
        dispatch(postActivity(input))
        swal({
            title: "Nice",
            text: "Activity created!",
            icon: "success"
        });
        setInput({
            name: '',
            difficulty: '', 
            duration: '',
            season:'',
            countries: [],
        })
        history.replace('/home')
        }
    }


    function handlecountryDelete(e){
        console.log(e)
        console.log(e.target.value);
        e.preventDefault()
        const countryExist = input.countries.filter((c) => c !== e.target.value)
        setInput({
            ...input,
            countries: countryExist
        })
    }
    
    return (
    <div className='bodydetail'>
        <Header/>
        <div className='centerInfo'>
        <h1>Create Activity</h1>
       <form onSubmit={(e) =>handleSubmit(e)} autoComplete="off">
            <div>
            <label>Name:</label>
            <input 
            className='spacesAndColorSelect'
            type= 'text'
            value = {input.name}
            name = 'name'
            onChange={(e)=> handleChange(e)}
            />
            {errors.name && (
                <p className='danger'>{errors.name}</p>
            )}
            </div>
            <br/>
            <div>
            <label>Difficulty:</label>
            <input 
            className='spacesAndColorSelect'
            type= 'number'
            value = {input.difficulty}
            name = 'difficulty'
            min={1}
            max={5}
            onChange={(e)=> handleChangeDifficulty(e)}
            />
            {errors.difficulty && (
                <p className='danger'>{errors.difficulty}</p>
            )}
            </div>
            <br/>
            <div>       
            <label>Duration:</label>
            <input 
            className='spacesAndColorSelect'
            type= 'number'
            value = {input.duration}
            name = 'duration'
            min={1}
            max={12}
            onChange={(e)=> handleChangeDuration(e)}
            />
             {errors.duration && (
                <p className='danger'>{errors.duration}</p>
            )}
            </div>
            <br/>
            <div>       
            <label>Season:</label>
            <select className='spacesAndColorSelect' name="season" defaultValue={'DEFAULT'} onChange={(e)=> handleSelectSeason(e)}>
            <option value='DEFAULT'  disabled defaultValue > All</option>
            <option value='Autumn'>Autumn</option>
            <option value='Summer'>Summer</option>
            <option value='Spring'>Spring</option>
            <option value='Winter'>Winter</option>
            </select>
            {errors.season && (
                <p className='danger'>{errors.season}</p>
            )}
            </div>
            <br/>
            <div>       
            <label>Countries:</label>
            <select className='spacesAndColorSelectCountries' name="countries" defaultValue={'DEFAULT'} onChange={(e)=> handleSelectCountries(e)} >
            <option value='DEFAULT'  disabled defaultValue > All</option>
            {countriees  &&countriees.map(country => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
            </select>
            {errors.countries && (
                <p className='danger'>{errors.countries}</p>
            )}
            </div>
            <p>
                {
                input.countries.map(function(el){
                    return (
                    <li key={el}> {el  +  ' ' } <button  className='btncreate1' value ={el} onClick={(e)=> handlecountryDelete(e)}>x</button> </li>
                    )
                })
                }
            </p>
            <button className='btncreate' type='submit'>Create Activity</button>

       </form>
       </div>

        <Link to ='/home'>
        <h3 className='linkhome'>Go Home</h3>
        </Link>
    </div>
    
    )
}
