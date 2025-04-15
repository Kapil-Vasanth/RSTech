import { useForm } from 'react-hook-form';
import { useCreateEmployee } from '../hooks/useEmployees';
import { useNavigate } from 'react-router-dom';

export default function AddEmployeePage() {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createEmployee, isLoading } = useCreateEmployee();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createEmployee(data, {
      onSuccess: () => {
        reset();
        navigate('/employee');
      },
      onError: (error) => {
        console.error('Failed to create employee:', error);
        // Show toast or alert here
      },
    });
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <input  {...register('name')} placeholder="Name" className="input border border-gray-400 rounded p-2" required />
        <input {...register('employee_id')} placeholder="Employee ID" className="input border border-gray-400 rounded p-2" required />

        <input {...register('department')} placeholder="Department" className="input border border-gray-400 rounded p-2" required />
        <input {...register('designation')} placeholder="Designation" className="input border border-gray-400 rounded p-2" required />

        <input {...register('project')} placeholder="Project" className="input border border-gray-400 rounded p-2" />
        <input {...register('type')} placeholder="Type" className="input border border-gray-400 rounded p-2" required />

        <select {...register('status')} className="input border border-gray-400 rounded p-2" required>
          <option value="">Select Status</option>
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
        </select>

        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => navigate('/employee')}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {isLoading ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
}
