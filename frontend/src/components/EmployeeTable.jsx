import AddEmployeeButton from './AddEmployeeButton.jsx';
import EmployeeRow from './EmplyeeRow.jsx';
import SearchBar from './SearchBar.jsx';

export default function EmployeeTable({ employees }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-2  ">
        <h1 className="text-2xl font-bold">Employee</h1>
        <div className="flex gap-2">
        <SearchBar />
        <AddEmployeeButton />
        </div>
      </div>
      <table className="w-full mt-6 text-left border-collapse border border-gray-400 rounded-sm">
        <thead>
          <tr>
            {["Employee Name", "Employee ID", "Department", "Designation", "Project", "Type", "Status", "Action"].map(col => (
              <th key={col} className="px-4 py-2 border-b font-light">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <EmployeeRow key={index} data={emp} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
