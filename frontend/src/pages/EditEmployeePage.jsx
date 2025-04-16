import { useForm } from 'react-hook-form';
import { useEmployee, useUpdateEmployee } from '../hooks/useEmployees';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading: isFetching, isError } = useEmployee(id);
  const { mutate: updateEmployee, isLoading: isSaving } = useUpdateEmployee();
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (employee) {
      reset(employee);
      if (employee.image) {
        setPreview(employee.image);
      }
    }
  }, [employee, reset]);

  const onSubmit = (data) => {
    updateEmployee(
      { id, ...data },
      {
        onSuccess: () => {
          navigate('/employee');
        },
        onError: (error) => {
          console.error('Failed to update employee:', error);
        },
      }
    );
  };

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

  if (isFetching) return <p className="p-4">Loading employee details...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading employee.</p>;

  return (
    <div className="p-6">
      <div className="flex gap-2">
        <div className='text-4xl cursor-pointer' onClick={() => navigate(-1)}>{`<`}</div>
        <h1 className="text-4xl font-bold mb-4">Edit Employee</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div className="col-span-2 relative w-32 h-32 border">
          <input
            type="file"
            {...register('photo')}
            className="absolute opacity-0 w-full h-full cursor-pointer"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>
        <input {...register('name')} placeholder="Name" className="border rounded p-2" required />
        <input {...register('employee_id')} placeholder="Employee ID" className="border rounded p-2" required />
        <input {...register('department')} placeholder="Department" className="border rounded p-2" required />
        <input {...register('designation')} placeholder="Designation" className="border rounded p-2" required />
        <input {...register('project')} placeholder="Project" className="border rounded p-2" />
        <input {...register('type')} placeholder="Type" className="border rounded p-2" required />
        <select {...register('status')} className="border rounded p-2" required>
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
            disabled={isSaving}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            {isSaving ? 'Saving...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
