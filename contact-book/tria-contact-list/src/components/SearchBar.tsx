interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name..."
      className="border rounded-lg p-2 w-full focus:ring focus:ring-blue-300 outline-none"
    />
  );
};

export default SearchBar;
