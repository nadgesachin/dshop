import React, { useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';

const ManagePromotions: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([
    {
      title: 'Summer Mega Sale',
      description: 'Get up to 50% off on selected electronics. Limited time offer!',
      image: 'https://images.unsplash.com/photo-1592503254549-1ad65c08b2ce?auto=format&fit=crop&w=400&q=80',
      file: null,
    },
  ]);

  const [form, setForm] = useState<{
    title: string;
    description: string;
    image: string;
    file: File | null;
  }>({ title: '', description: '', image: '', file: null });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string, file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrEdit = () => {
    if (editIndex !== null) {
      const updated = [...campaigns];
      updated[editIndex] = form;
      setCampaigns(updated);
    } else {
      setCampaigns((prev) => [...prev, form]);
    }
    setForm({ title: '', description: '', image: '', file: null });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setForm(campaigns[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    setCampaigns((prev) => prev.filter((_, i) => i !== index));
  };

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
                onChange={handleImageUpload}
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
          </div>
        </div>

        {form.image && (
          <div className="mt-4">
            <img src={form.image} alt="Preview" className="h-40 object-cover rounded-lg" />
          </div>
        )}

        <button
          onClick={handleAddOrEdit}
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
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(index)} className="p-2 rounded bg-yellow-400 text-white hover:bg-yellow-500">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(index)} className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePromotions;
