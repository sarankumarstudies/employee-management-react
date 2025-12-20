import axios from "axios";

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1';


class EmployeeService {

    saveEmployee (employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }
    getEmployees (){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    
}
const employeeService = new EmployeeService();
export default new EmployeeService;