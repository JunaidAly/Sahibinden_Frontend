import React, { useState, useEffect } from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the import path to your Firebase config

export function ProductsGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, 'allAddsPost'));
                const productsData = [];
                
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    console.log('Document ID:', doc.id);
                    console.log('Document data:', docData);
                    console.log('Document keys:', Object.keys(docData));
                    
                    // Check if this document has the expected property structure
                    if (docData.propertyType || docData.images || docData.price) {
                        // This is a direct property document
                        console.log('Found direct property document:', doc.id);
                        productsData.push({
                            id: doc.id, // Use the actual Firebase document ID
                            uniqueKey: `direct_${doc.id}`, // Add unique key for React
                            docId: doc.id,
                            ...docData
                        });
                    } else {
                        // Handle nested structure - extract products from arrays
                        Object.keys(docData).forEach(categoryKey => {
                            if (categoryKey !== 'id' && Array.isArray(docData[categoryKey])) {
                                console.log(`Found array in ${categoryKey}:`, docData[categoryKey].length, 'items');
                                docData[categoryKey].forEach((product, index) => {
                                    console.log(`Product ${index} in ${categoryKey}:`, product);
                                    // Create unique identifiers
                                    const productId = product.addID || `${doc.id}_${categoryKey}_${index}`;
                                    const uniqueKey = `nested_${doc.id}_${categoryKey}_${index}`;
                                    
                                    productsData.push({
                                        id: productId,
                                        uniqueKey: uniqueKey, // Add unique key for React
                                        originalAddID: product.addID,
                                        docId: doc.id,
                                        categoryKey: categoryKey,
                                        arrayIndex: index,
                                        ...product
                                    });
                                });
                            } else if (categoryKey !== 'id' && docData[categoryKey] && typeof docData[categoryKey] === 'object' && !Array.isArray(docData[categoryKey])) {
                                // Handle single object properties that might have addID
                                const singleProduct = docData[categoryKey];
                                console.log(`Found object in ${categoryKey}:`, singleProduct);
                                
                                if (singleProduct.addID || singleProduct.propertyType || singleProduct.images) {
                                    const productId = singleProduct.addID || `${doc.id}_${categoryKey}`;
                                    const uniqueKey = `object_${doc.id}_${categoryKey}`;
                                    
                                    productsData.push({
                                        id: productId,
                                        uniqueKey: uniqueKey,
                                        originalAddID: singleProduct.addID,
                                        docId: doc.id,
                                        categoryKey: categoryKey,
                                        ...singleProduct
                                    });
                                }
                            }
                        });
                    }
                });
                
                console.log('Processed products data:', productsData);
                console.log('Sample product for debugging:', productsData[0]);
                setProducts(productsData);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <main className="flex-1 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, idx) => (
                        <div key={idx} className="bg-gray-200 animate-pulse rounded-lg w-[285px] h-[387px]">
                            <div className="w-[285px] h-[300px] bg-gray-300 rounded"></div>
                            <div className="p-4">
                                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex-1 p-6">
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link key={product.uniqueKey || product.id} to={`/ad-details/${product.originalAddID || product.id}`}>
                        <ProductCard {...product} />
                    </Link>
                ))}
            </div>
        </main>
    );
}

export function Stats() {
    const stats = [
        { value: '20K', label: 'Satisfied Clients' },
        { value: '30K', label: 'Items sold' },
        { value: '99%', label: 'Client Satisfaction' },
        { value: '10+', label: 'Work experience' },
    ];
    return (
        <section className="bg-white my-12 p-8 w-[1126px] h-[153px] border-t-[1px] border-b-[#EBEBEB] border-b-[1px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
                {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center justify-center gap-5 font-poppins">
                        <h3 className="text-3xl font-[900] text-[64px] text-[#231E1C]">{s.value}</h3>
                        <p className="text-[#8D8D8D] font-[500]">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProductCard({ imageUrls, title, category, images, name, location, propertyType, siteName, ...otherProps }) {
    // Handle both old format and new Firebase format
    const displayImage = imageUrls?.[0] || images?.[0] || '/assets/products/placeholder.png';
    const displayTitle = propertyType || category || name || 'Property Name';
    const displayCategory = siteName || location || 'Location';

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition w-[285px] h-[387px]">
            <img 
                src={displayImage} 
                alt={displayTitle} 
                className="w-[285px] h-[300px] object-cover rounded"
                onError={(e) => {
                    e.target.src = '/assets/products/placeholder.png';
                }}
            />
            <h3 className="flex items-center gap-1 ml-2 mt-3 text-lg font-medium">
                {displayTitle}
                <RiVerifiedBadgeFill className='w-5 h-5' />
            </h3>
            <p className="text-sm ml-2 text-gray-500">{displayCategory}</p>
        </div>
    );
}

export default ProductCard;