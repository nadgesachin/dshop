import React, { useState, useEffect } from 'react';
// import { Trash2, Pencil, X } from 'lucide-react';
import { X } from 'lucide-react';
import { uploadImage } from '@/services/upload';
import { addPromotion, getAllPromotions } from '@/services/promotionService';
import toast from 'react-hot-toast';

const ManagePromotions: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const [form, setForm] = useState<{
    title: string;
    description: string;
    image: string;
  }>({ title: '', description: '', image: '' });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleImageUpload = async (file: File | File[] | null) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('profilePhoto', file as File);
      const result = await uploadImage(formData);
      setPhotoUrl(result.profilePhotoUrl);
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0] || null;
      await handleImageUpload(file);
      e.target.files = null;
    } catch (error) {
      toast.error("Error occure during image upload");
    }
  }

  const handleSubmit = async () => {
    try {
      const campaignData = {
        title: form.title,
        description: form.description,
        image: photoUrl || form.image, // fallback if image isn't re-uploaded
      };
  
      await addPromotion(campaignData); // Backend call
      toast.success("Submit Successfully");
  
      setCampaigns((prev) => {
        const updated = [...prev];
        if (editIndex !== null) {
          updated[editIndex] = campaignData;
        } else {
          updated.push(campaignData);
        }
        return updated;
      });
  
      // Reset form
      setForm({ title: '', description: '', image: '' });
      setPhotoUrl('');
      setEditIndex(null);
    } catch (error: any) {
      toast.error(error?.message || "Submission failed");
    }
  };
  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await getAllPromotions();
        setCampaigns(res.data); // <== make sure to access .data
      } catch (error: any) {
        toast.error('Failed to load promotions');
        console.error(error);
      }
    };
  
    fetchPromotions();
  }, []);  

  // const handleEdit = (index: number) => {
  //   setForm(campaigns[index]);
  //   setEditIndex(index);
  // };

  // const handleDelete = (index: number) => {
  //   setCampaigns((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Promotional Campaigns</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">{editIndex !== null ? 'Edit' : 'Add'} Campaign</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="border rounded-lg px-4 py-2 w-full"
          />

          {/* Styled File Upload */}
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Campaign Image
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition">
              <input
                type="file"
                id="photos"
                name="photos"
                accept="image/*"
                onChange={handleChangeImage}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
              {photoUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Selected files:</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-500">
                    <li key={0} className="flex items-center justify-between">
                      <span className="truncate">{photoUrl}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoUrl('');
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 text-lg"
                      >
                        ×
                      </button>
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </div>
        <button
          onClick={() => {
            setForm({ title: '', description: '', image: '' });
            setPhotoUrl('');
            setEditIndex(null);
          }}
          className="mt-4 ml-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          {editIndex !== null ? 'Update Campaign' : 'Add Campaign'}
        </button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((camp, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {camp.image && (
                <img src={camp.image} alt={camp.title} className="h-20 w-20 rounded-lg object-cover" />
              )}
              <div>
                <h4 className="text-lg font-bold">{camp.title}</h4>
                <p className="text-gray-600 text-sm">{camp.description}</p>
              </div>
            </div>
            {/* <div className="flex space-x-2">
              <button onClick={() => handleEdit(index)} className="p-2 rounded bg-yellow-400 text-white hover:bg-yellow-500">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(index)} className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div> */}
          </div>
        ))}
      </div>
      {isUploading && (
        <div className="fixed inset-0 z-[99999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-sm relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setIsUploading(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Loader Visual */}
            <div className="flex flex-col items-center gap-6 mt-2">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full animate-spin-slow -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="rgba(229, 231, 235, 1)"  // Tailwind gray-200
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="rgba(249, 115, 22, 1)"  // Tailwind orange-500
                    strokeWidth="4"
                    strokeDasharray="90"
                    strokeLinecap="round"
                    className="animate-dash"
                  />
                </svg>
              </div>
              <p className="text-gray-600 font-medium text-base tracking-wide">Uploading... hang tight</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePromotions;
