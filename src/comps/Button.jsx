/* eslint-disable react/prop-types */
export default function Button({ children, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-secondary hover:bg-tertiary text-white border border-indigo-400 hover:border-indigo-500 font-bold py-2 px-16 my-2 rounded transition duration-300 ease-in-out"
      >
        {children}
      </button>
    </>
  );
}
