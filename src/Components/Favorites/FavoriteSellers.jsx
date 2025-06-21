function FavoriteSellers() {
  return (
    <div className="w-full max-w-4xl font-poppins mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-[400]">Favorite Sellers</h2>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="p-4">
          <h3 className="font-medium text-[25px] mb-2">How do I add a seller to my favourites?</h3>
          
          <p className="text-lg font-[400]">
            You can add the seller whose new listings you want to be informed about to your favorites by using
            the <span className='font-semibold'> Add to Favorite Sellers </span>link on the page where you view the listing details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FavoriteSellers;