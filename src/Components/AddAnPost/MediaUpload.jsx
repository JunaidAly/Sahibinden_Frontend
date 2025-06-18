import React from 'react';
import { Plus, X, Image as ImageIcon, Video } from 'lucide-react';

const MediaUpload = ({
  selectedImages,
  selectedVideo,
  onImageSelect,
  onVideoSelect,
  onRemoveImage,
  onRemoveVideo,
  uploading = false
}) => {
  return (
    <div>
      {/* Photograph Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-black mb-4">Photograph</h3>
        
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <label 
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <ImageIcon className="w-8 h-8 text-primaryBlue mb-1" />
            <span className="text-sm text-primaryBlue font-medium text-center">Take or Upload</span>
            <span className="text-xs text-primaryBlue">Photo</span>
          </label>
          
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={onImageSelect}
            className="hidden"
            disabled={uploading}
          />

          <label 
            htmlFor="phone-upload"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-8 h-8 text-primaryBlue mb-1" />
            <span className="text-sm text-primaryBlue font-medium text-center">Add Photo from</span>
            <span className="text-xs text-primaryBlue">Mobile Phone</span>
          </label>
          
          <input
            id="phone-upload"
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            onChange={onImageSelect}
            className="hidden"
            disabled={uploading}
          />
        </div>
        
        {selectedImages.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {selectedImages.map((imageObj) => (
                <div key={imageObj.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={imageObj.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => onRemoveImage(imageObj.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={uploading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-primaryBlue h-2 rounded-full transition-all duration-300"
                style={{ width: `${(selectedImages.length / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              You can increase the visibility of your ad with more photos ({selectedImages.length}/10)
            </p>
          </div>
        )}
      </div>

      {/* Video Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-black mb-4">Video</h3>
        
        {!selectedVideo ? (
          <div>
            <label 
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-primaryBlue rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <Video className="w-8 h-8 text-primaryBlue mb-1" />
              <span className="text-sm text-primaryBlue font-medium text-center">Take or Upload</span>
              <span className="text-xs text-primaryBlue">a Video</span>
            </label>
            
            <input
              id="video-upload"
              type="file"
              accept="video/mp4,video/mov,video/avi"
              onChange={onVideoSelect}
              className="hidden"
              disabled={uploading}
            />
            
            <p className="text-sm text-gray-600 mt-2">
              The video you add must be in 3gp, mp4 or mov format.<br />
              The maximum length of the video can be 1 minute.
            </p>
          </div>
        ) : (
          <div className="relative inline-block">
            <video 
              src={selectedVideo.preview} 
              className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200"
              controls
            />
            <button
              onClick={onRemoveVideo}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-600 mt-1">{selectedVideo.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;