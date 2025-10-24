interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name..."
        className="border-2 border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-300 outline-none"
      />
    </div>
  );
};

export default SearchBar;
