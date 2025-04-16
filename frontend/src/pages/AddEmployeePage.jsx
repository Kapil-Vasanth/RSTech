import { useForm } from 'react-hook-form';
import { useCreateEmployee } from '../hooks/useEmployees';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddEmployeePage() {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createEmployee, isLoading } = useCreateEmployee();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createEmployee(data, {
      onSuccess: () => {
        reset();
        navigate('/employees');
      },
      onError: (error) => {
        console.error('Failed to create employee:', error);
        // Show toast or alert here
      },
    });
  };
  

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-2">
      <div className='text-4xl cursor-pointer' onClick={() => navigate(-1)}>{`<`}</div>
        <h1 className="text-4xl font-bold mb-4">Add New Employee</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 relative w-32 h-32 border">
            <input 
              type="file" 
              {...register('photo')} 
              className=" border rounded  absolute visible opacity-0 w-full h-full cursor-pointer" 
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
              </div>
            )}
          </div>
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
              onClick={() => navigate('/employees')}
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
    </div>
  );
}
