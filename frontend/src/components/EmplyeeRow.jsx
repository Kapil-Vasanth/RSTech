import { Eye, Pencil, Trash2 } from "lucide-react";
export default function EmployeeRow({ data }) {
    return (
      <tr className="hover:bg-gray-100">
      <td className="px-4 py-2 flex items-center gap-2">
        <img src={data.image} alt={data.name} className="w-8 h-8 rounded-full" />
        {data.name}
      </td>
      <td className="px-4 py-2">{data.id}</td>
      <td className="px-4 py-2">{data.department}</td>
      <td className="px-4 py-2">{data.designation}</td>
      <td className="px-4 py-2">{data.project}</td>
      <td className="px-4 py-2">{data.type}</td>
      <td className="px-4 py-2">{data.status}</td>
      <td className="px-4 py-2 space-x-2">
        <button>
        <Eye className="w-4 h-4" />
        </button>
        <button>
        <Pencil className="w-4 h-4" />
        </button>
        <button>
        <Trash2 className="w-4 h-4" />
        </button>
      </td>
      </tr>
    );
  }
  