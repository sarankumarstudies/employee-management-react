import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const UpdateEmployee = () => {

   const { id } = useParams();
   const navigate = useNavigate();
   const [employee, setEmployee] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
   })
          const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]: value})
    }

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await EmployeeService.getEmployeeById(id);
            setEmployee(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    fetchData();
}, [id]);

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            await EmployeeService.updateEmployee(employee, id);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const cancel = (e) => {
        e.preventDefault();
        navigate("/");
    }
  return (
      <div className="flex max-w-2xl mx-auto shadow border-b">
         <div className="px-8 py-8">
        <div className='font-thin text-2xl tracking tracking-wider'>
    <h1> Update Employee</h1>

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
<button onClick={updateEmployee} className='rounded text-white font-semibold bg-blue-600 
hover:bg-blue-950 py-2 px-6
'> Update </button>
 
<button onClick={cancel} className='rounded text-white font-semibold bg-red-600 
hover:bg-red-700
py-2 px-6'> Cancel </button>
</div>
         </div>
        </div>
  )
}

export default UpdateEmployee