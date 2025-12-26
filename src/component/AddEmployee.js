import React, { useState } from 'react'
import EmployeeService from '../service/EmployeeService';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    
    const[employee, setEmployee] = useState({
        id:"",
        firstName : "",
        lastName :"",
        email : "",

    })

    const navigate = useNavigate();
    const reset = (e)=> {
        e.preventDefault();
        setEmployee({ id:"",
        firstName : "",
        lastName :"",
        email : "",});
        
    }
const saveEmployee = (e)=> { e.preventDefault();
    EmployeeService.saveEmployee(employee).then((response)=> {
        console.log(response)
        navigate("/employeeList")
    }).catch((erorr)=>
        {console.log(erorr);}
        );
}
    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]: value})
    }
  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
         <div className="px-8 py-8">
        <div className='font-thin text-2xl tracking tracking-wider'>
    <h1> Add New Employee</h1>

        </div>
<div className='itmes-center justify-cennter h-14 w-full my-4'>
<label className='block text-gray-600 text-sm font-normal'>First Name</label>
<input 

type='text' 
name='firstName' 
value={employee.firstName}
onChange={(e) => handleChange(e)}
className='h-10 w-96 border mt-2 px-2 py-2'></input>
</div>
<div className='itmes-center justify-cennter h-14 w-full my-4'>
<label className='block text-gray-600 text-sm font-normal'>Last Name</label>
<input
type='text' 
name='lastName' 
value={employee.lastName}
onChange={(e) => handleChange(e)}
className='h-10 w-96 border mt-2 px-2 py-2'></input>
</div>
<div className='itmes-center justify-cennter h-14 w-full my-4'>
<label className='block text-gray-600 text-sm font-normal'>Email</label>
<input type='email'
name='email' 
value={employee.email}
onChange={(e) => handleChange(e)}
className='h-10 w-96 border mt-2 px-2 py-2'></input>
</div>

<div className='itmes-center justify-cennter h-14 w-full my-4  space-x-4 pt-4'>
<button onClick={saveEmployee} className='rounded text-black font-semibold bg-blue-600 
hover:bg-blue-950 py-2 px-6
'> Save </button>
 
<button onClick ={reset} className='rounded text-black font-semibold bg-red-600 
hover:bg-red-700
py-2 px-6'> Clear </button>
</div>
         </div>
        </div>
  )
}

export default AddEmployee