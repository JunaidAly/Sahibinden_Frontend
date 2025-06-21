function FavoriteSearches() {
  return (
    <div className="w-full max-w-4xl font-poppins mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-[400]">Favorite Searches</h2>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="p-4">
          <h3 className="font-medium text-[25px] mb-2">How do I save ads to my favorite searches?</h3>
          
          <p className="text-lg font-[400]">
            You do not have a favorite search. Use the "Save Search" link on our search results pages to add 
            your search to your favorites, and we will notify you by e-mail when ads matching your search 
            selections are added.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FavoriteSearches;