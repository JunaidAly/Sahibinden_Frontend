import { useEffect ,useState } from 'react';
 const  SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Add actual search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full max-w-4xl p-5">
      <div className="text-[#8D8D8D] mb-2 text-lg font-medium">
        You Can Search By Ad Number Or Sender Name.
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="bg-[#1544AB] text-white px-6 py-3 rounded-full text-sm font-medium uppercase "
        >
          Search
        </button>
      </div>
      
      <div className="text-black  text-lg font-semibold">
        You have no messages.
      </div>
    </div>
  );
};
export default SearchComponent;