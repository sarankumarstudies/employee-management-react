# Employee Management CRUD Application - Frontend Architecture Documentation

## Overview
This React frontend application implements a complete CRUD (Create, Read, Update, Delete) system for employee management. It communicates with a Spring Boot backend through RESTful API calls.

## Application Architecture

### Frontend Structure
```
src/
├── component/
│   ├── AddEmployee.js      # Create new employee
│   ├── EmployeeList.js     # Read/Display all employees
│   ├── UpdateEmployee.js   # Update existing employee
│   ├── Employee.js         # Individual employee row component
│   └── Navbar.js          # Navigation component
├── service/
│   └── EmployeeService.js  # API service layer
├── App.js                  # Main routing component
└── index.js               # Application entry point
```

### Backend Integration Points
The frontend expects a Spring Boot backend with the following structure:

```
Backend Structure (Expected):
├── Controller Layer    → EmployeeController.java
├── Service Layer      → EmployeeService.java  
├── Repository Layer   → EmployeeRepository.java
└── Entity Layer       → Employee.java
```

## CRUD Operations Flow

### 1. CREATE (Add Employee)

#### Frontend Flow:
1. **User Navigation**: User clicks "Add Employee" button in `EmployeeList.js`
2. **Route Navigation**: React Router navigates to `/addEmployee`
3. **Component Rendering**: `AddEmployee.js` component renders the form
4. **Form Interaction**: User fills out employee details (firstName, lastName, email)
5. **State Management**: `handleChange()` updates component state on each input change
6. **Form Submission**: User clicks "Save" button, triggering `saveEmployee()` function
7. **API Call**: `EmployeeService.saveEmployee()` makes POST request to backend
8. **Navigation**: On success, user is redirected to employee list

#### API Call Details:
```javascript
// Frontend Service Call
EmployeeService.saveEmployee(employee)
// Translates to:
axios.post('http://localhost:8080/api/v1', employee)
```

#### Expected Spring Boot Backend Flow:
```java
// 1. Controller receives request
@PostMapping("/api/v1")
public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
    Employee savedEmployee = employeeService.saveEmployee(employee);
    return ResponseEntity.ok(savedEmployee);
}

// 2. Service processes business logic
@Service
public Employee saveEmployee(Employee employee) {
    // Business validation logic
    return employeeRepository.save(employee);
}

// 3. Repository saves to database
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // JPA handles the database transaction
}

// 4. Database transaction
// INSERT INTO employees (first_name, last_name, email) VALUES (?, ?, ?)
```

### 2. READ (Get Employees)

#### Frontend Flow:
1. **Component Mount**: `EmployeeList.js` component mounts
2. **useEffect Hook**: Triggers `fetchData()` function on component mount
3. **API Call**: `EmployeeService.getEmployees()` fetches all employees
4. **State Update**: Retrieved data updates `employees` state
5. **Rendering**: Component maps through employees array and renders `Employee` components

#### API Call Details:
```javascript
// Frontend Service Call
EmployeeService.getEmployees()
// Translates to:
axios.get('http://localhost:8080/api/v1')
```

#### Expected Spring Boot Backend Flow:
```java
// 1. Controller handles GET request
@GetMapping("/api/v1")
public ResponseEntity<List<Employee>> getAllEmployees() {
    List<Employee> employees = employeeService.getAllEmployees();
    return ResponseEntity.ok(employees);
}

// 2. Service retrieves data
@Service
public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
}

// 3. Repository queries database
// SELECT * FROM employees
```

### 3. READ BY ID (Get Single Employee)

#### Frontend Flow:
1. **Route Parameter**: User navigates to `/editEmployee/:id`
2. **Parameter Extraction**: `useParams()` extracts employee ID from URL
3. **API Call**: `EmployeeService.getEmployeeById(id)` fetches specific employee
4. **Form Population**: Retrieved data populates the update form

#### API Call Details:
```javascript
// Frontend Service Call
EmployeeService.getEmployeeById(id)
// Translates to:
axios.get('http://localhost:8080/api/v1/getEmployeeById/' + id)
```

#### Expected Spring Boot Backend Flow:
```java
// 1. Controller handles GET by ID
@GetMapping("/api/v1/getEmployeeById/{id}")
public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
    Employee employee = employeeService.getEmployeeById(id);
    return ResponseEntity.ok(employee);
}

// 2. Service finds employee
@Service
public Employee getEmployeeById(Long id) {
    return employeeRepository.findById(id)
        .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
}

// 3. Repository queries database
// SELECT * FROM employees WHERE id = ?
```

### 4. UPDATE (Edit Employee)

#### Frontend Flow:
1. **Edit Button Click**: User clicks "Edit" in employee row
2. **Navigation**: React Router navigates to `/editEmployee/:id`
3. **Data Fetching**: `UpdateEmployee.js` fetches current employee data
4. **Form Pre-population**: Form fields are populated with existing data
5. **User Modification**: User modifies the form fields
6. **State Updates**: `handleChange()` updates component state
7. **Form Submission**: User clicks "Update" button
8. **API Call**: `EmployeeService.updateEmployee()` sends PUT request
9. **Navigation**: On success, user is redirected to employee list

#### API Call Details:
```javascript
// Frontend Service Call
EmployeeService.updateEmployee(employee, id)
// Translates to:
axios.put('http://localhost:8080/api/v1/' + id, employee)
```

#### Expected Spring Boot Backend Flow:
```java
// 1. Controller handles PUT request
@PutMapping("/api/v1/{id}")
public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
    Employee updatedEmployee = employeeService.updateEmployee(id, employee);
    return ResponseEntity.ok(updatedEmployee);
}

// 2. Service updates employee
@Service
public Employee updateEmployee(Long id, Employee employeeDetails) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
    
    employee.setFirstName(employeeDetails.getFirstName());
    employee.setLastName(employeeDetails.getLastName());
    employee.setEmail(employeeDetails.getEmail());
    
    return employeeRepository.save(employee);
}

// 3. Repository updates database
// UPDATE employees SET first_name=?, last_name=?, email=? WHERE id=?
```

### 5. DELETE (Remove Employee)

#### Frontend Flow:
1. **Delete Button Click**: User clicks "Delete" in employee row
2. **API Call**: `EmployeeService.deleteEmployee(id)` sends DELETE request
3. **State Update**: On success, employee is removed from local state
4. **UI Update**: Component re-renders without the deleted employee

#### API Call Details:
```javascript
// Frontend Service Call
EmployeeService.deleteEmployee(id)
// Translates to:
axios.delete('http://localhost:8080/api/v1/' + id)
```

#### Expected Spring Boot Backend Flow:
```java
// 1. Controller handles DELETE request
@DeleteMapping("/api/v1/{id}")
public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
    employeeService.deleteEmployee(id);
    return ResponseEntity.noContent().build();
}

// 2. Service deletes employee
@Service
public void deleteEmployee(Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
    employeeRepository.delete(employee);
}

// 3. Repository deletes from database
// DELETE FROM employees WHERE id = ?
```

## Transaction Flow Summary

### Complete Request-Response Cycle:

1. **Frontend Component** → User interaction triggers action
2. **React State Management** → Component state updates
3. **Service Layer** → EmployeeService makes HTTP request
4. **HTTP Request** → Axios sends request to Spring Boot backend
5. **Spring Boot Controller** → Receives and validates request
6. **Service Layer** → Processes business logic
7. **Repository Layer** → Handles database operations
8. **Database** → Executes SQL operations
9. **Response Chain** → Data flows back through all layers
10. **Frontend Update** → Component state updates and UI re-renders

## Key Components Explained

### EmployeeService.js (API Layer)
```javascript
class EmployeeService {
    saveEmployee(employee)     // POST - Create new employee
    getEmployees()            // GET - Fetch all employees  
    getEmployeeById(id)       // GET - Fetch single employee
    updateEmployee(employee, id) // PUT - Update existing employee
    deleteEmployee(id)        // DELETE - Remove employee
}
```

### State Management Pattern
Each component uses React hooks for state management:
- `useState()` - Manages component state
- `useEffect()` - Handles side effects (API calls)
- `useNavigate()` - Programmatic navigation
- `useParams()` - Extract URL parameters

### Error Handling
- Try-catch blocks for async operations
- Console logging for debugging
- User feedback through navigation

## Expected Backend Entity Structure

```java
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name") 
    private String lastName;
    
    @Column(name = "email")
    private String email;
    
    // Constructors, getters, setters
}
```

## API Endpoints Summary

| Operation | Method | Endpoint | Purpose |
|-----------|--------|----------|---------|
| Create | POST | `/api/v1` | Add new employee |
| Read All | GET | `/api/v1` | Get all employees |
| Read One | GET | `/api/v1/getEmployeeById/{id}` | Get employee by ID |
| Update | PUT | `/api/v1/{id}` | Update employee |
| Delete | DELETE | `/api/v1/{id}` | Delete employee |

## Database Transactions

Each CRUD operation corresponds to specific database transactions:

- **CREATE**: `INSERT INTO employees (first_name, last_name, email) VALUES (?, ?, ?)`
- **READ**: `SELECT * FROM employees` or `SELECT * FROM employees WHERE id = ?`
- **UPDATE**: `UPDATE employees SET first_name=?, last_name=?, email=? WHERE id=?`
- **DELETE**: `DELETE FROM employees WHERE id = ?`

This architecture ensures clean separation of concerns, maintainable code, and efficient data flow between the React frontend and Spring Boot backend.