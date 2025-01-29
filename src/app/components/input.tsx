interface InputProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  label?: string;
}

export default function Input({ onChange, value, label, id }: InputProps) {
  return (
    <div className="w-64">
      <label htmlFor={id} className="block text-black text-md mb-2">
        {label}
      </label>
      <input
        id={id}
        className="border rounded-lg shadow-sm h-10 p-4 "
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
