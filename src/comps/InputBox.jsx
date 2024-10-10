/* eslint-disable react/prop-types */
export default function InputBox({ title, placeholder, type, onChange }) {
  return (
    <div className="my-4">
      <h2 className="block text-base font-medium text-gray-700">{title}</h2>
      <div className="mt-1">
        <input
          type={type}
          className="w-full px-2 py-2 mt-1 border rounded border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
