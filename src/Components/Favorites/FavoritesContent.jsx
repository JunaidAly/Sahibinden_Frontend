import { useState } from 'react';

function FavoritesContent({ activeComponent }) {

  const renderFavoriteSearches = () => {
    return (
      <>
       <div className="w-full max-w-4xl font-poppins mx-auto ">
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
      </>
    );
  };

 
  const renderFavoriteListing = () => {
    const [lists, setLists] = useState([
      { id: 1, name: 'My Favorite List', count: 0 }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState('');
  
    const handleCreateNewList = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setNewListName('');
    };
  
    const handleSaveList = () => {
      if (newListName.trim()) {
        setLists([...lists, { 
          id: lists.length + 1, 
          name: newListName, 
          count: 0 
        }]);
        handleCloseModal();
      }
    };
    return (
      <>
       <div className="px-4 w-full font-poppins  ">
      <h2 className="text-2xl font-[400] mb-4">Favorite Listings</h2>
      
      <div className="grid grid-cols-2 h-[300px] gap-4">
        {/* Existing favorite list */}
        <div className="bg-[#1544AB] border border-[#1544AB] text-white rounded-md p-6 flex flex-col items-center justify-center h-full shadow-sm">
          <h3 className="font-medium text-center text-xl">My Favorite List</h3>
          <p className="text-xl mt-2">({lists[0].count} listings)</p>
        </div>
        
        {/* Create new list card */}
        <div 
          onClick={handleCreateNewList}
          className="border border-[#1544AB] rounded-md p-6 flex flex-col items-center justify-center h-full cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
        >
          <div className="text-[#1544AB] mb-2">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <p className="text-[#1544AB] text-xl">Create New List</p>
        </div>
      </div>

      {/* Create New List Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={handleCloseModal}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-lg border border-blue-900 overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b">
                <h3 className="text-xl font-medium">Create New List</h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="p-6 flex justify-end">
                <button
                  onClick={handleSaveList}
                  disabled={!newListName.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
      </>
    );
  };

  const renderFavoriteSellers = () => {
    return (
      <>
       <div className="w-full max-w-4xl font-poppins mx-auto ">
      <div className="mb-4">
        <h2 className="text-2xl font-[400]">Favorite Sellers</h2>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="p-4">
          <h3 className="font-medium text-[25px] mb-2">How do I add a seller to my favourites?</h3>
          
          <p className="text-lg font-[400]">
          You can add the seller whose new listings you want to be informed about to your favorites by using
          the <span className='font-semibold'> Add to Favorite Sellers </span>link on the page where you view the listing details.
          </p>
        </div>
      </div>
    </div>
      </>
    );
  };

  // Render content based on activeComponent
  return (
    <>
      {activeComponent === 'listing' && renderFavoriteListing()}
      {activeComponent === 'sellers' && renderFavoriteSellers()}
      {activeComponent === 'searches' && renderFavoriteSearches()}
    </>
  );
}

export default FavoritesContent