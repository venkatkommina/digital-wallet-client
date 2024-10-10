/* eslint-disable react/prop-types */
export default function Info({ type, label }) {
  return (
    <div className="flex items-center px-4 py-2">
      <div className="text-card-foreground text-lg font-medium">
        {type}: {label}
      </div>
    </div>
  );
}
