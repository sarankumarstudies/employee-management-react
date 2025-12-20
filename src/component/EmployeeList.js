import React from 'react'

const EmployeeList = () => {
  return (
   <div className='container mx-auto my-6'>
   <div> 
    <button className='rounded bg-slate-600 text-white px-6 py-2 font-sans' > Add Employee</button>
   </div>

   <div className='flec shadow border-b'>
    <table className='min-w-full'> 
      <thead>
        <tr>
          <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'> First Name</th>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'> Last Name</th>
                  <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'> Email Id</th>
                      <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>  Actions</th>

        </tr>
      </thead>
      <tbody className='bg-white'>
        <tr>
          <td className='text-left px-6 py-4 whitespace-nowrap'> 
            <div className='text-sm text-gray-500'>Saran</div>
          </td>
            
              <td className='text-left px-6 py-4 whitespace-nowrap'> 
            <div className='text-sm text-gray-500'>Kumar</div>
          </td>

            <td className='text-left px-6 py-4 whitespace-nowrap'> 
            <div className='text-sm text-gray-500'>sarankumar9820@gmail.com</div>
          </td>

            <td className='text-left px-6 py-4 whitespace-nowrap'> 
             <a href='#' className=' text-indigo-600 hover:text-indigo-800'>Edit</a>
              <a href='#' className=' text-indigo-600 hover:text-indigo-800'> Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

   </div>
   </div>
  )
}

export default EmployeeList