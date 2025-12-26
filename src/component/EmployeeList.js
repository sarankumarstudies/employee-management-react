import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService';
import Employee from './Employee';

const EmployeeList = () => {

const nagivate = useNavigate ();
const [loadding, setLoading] = useState(true)
const [employees, setEmployee]= useState(null);
useEffect(() => {
  const fetchData = async ()=> 
  {
    setLoading(true);
    try {
      const reponse = await EmployeeService.getEmployees();
      setEmployee(reponse.data)
    }
    catch (error){
      console.log(error)
    }
    setLoading(false);
  }

  fetchData();
}, []);
 
const deleteEmployee = (e, id)=>{
  e.preventDefault();
  EmployeeService.deleteEmployee(id).then((res)=>
  {
    if(employees){
      setEmployee((prevElement)=> {
      return prevElement.filter((employee)=>
      employee.id !==id)
    });
  }
  })
};

  return (
   <div className='container mx-auto my-6'>
   <div> 
    <button
    onClick={()=> nagivate("/addEmployee")}
    className='rounded bg-slate-600 text-white px-6 py-2 font-sans' > Add Employee</button>
   </div>

   <div className='flec shadow border-b'>
    <table className='min-w-full'> 
      <thead>
        <tr>
          <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'> employees</th>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'> Last Name</th>
                  <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'> Email Id</th>
                      <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>  Actions</th>

        </tr>
      </thead>
      {!loadding && (

      
      <tbody className='bg-white'>
        {employees.map((employee)=>(
        <Employee employee={employee} deleteEmployee= {deleteEmployee} key={employee.id}></Employee>
   
        ))}
      </tbody>
      )}
    </table>

   </div>
   </div>
  )
}

export default EmployeeList