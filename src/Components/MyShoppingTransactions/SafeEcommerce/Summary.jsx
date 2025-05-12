import React from 'react'

function Summary() {
    const summaryItems = [
        {
          icon: <img src='/assets/summary/1.svg' />,
          title: "Buy Now",
          description: "By doing business on sahibinden.com, you can easily reach millions of buyers, grow business online, and easily add income to your income.",
          buttonText: "I WANT TO SELL PRODUCTS",
          buttonAction: () => console.log('Sell products clicked')
        },
        {
          icon: <img src='/assets/summary/2.svg' />,
          title: "What is Secure E-Commerce?",
          description: "With sahibinden.com Secure e-Commerce (SeT) system, both the buyer and seller's money is safe in your purchases, you do not take any risk. All you have to do is enjoy your shopping.",
          buttonText: "VIEW DETAILS",
          buttonAction: () => console.log('View details clicked')
        }
      ];
  return (
    <div className="max-w-4xl w-full mx-auto p-6 font-poppins">
      <h2 className="text-xl font-medium mb-6">Summary</h2>
      
      <div className="space-y-4">
        {summaryItems.map((item, index) => (
          <div key={index} className="bg-white shadow-custom-diagonal rounded-lg p-5">
            <div className="flex gap-4">
              {/* Icon Container */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-black text-sm mb-4">
                  {item.description}
                </p>
              </div>
              
              {/* Button */}
              <div className="flex-shrink-0 self-end">
                <button
                  onClick={item.buttonAction}
                  className="bg-[#1544AB] text-white px-5 py-2 rounded-full text-sm font-medium  whitespace-nowrap"
                >
                  {item.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Summary