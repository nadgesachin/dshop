import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { getAllSubcribers } from '../services/subscribeService'

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

const NewsletterSubscribersPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const res = await getAllSubcribers();
        setSubscribers(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch subscribers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscribers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Mail className="h-8 w-8 text-orange-500" />
        Newsletter Subscribers
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-500 text-center">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {subscribers.map((subscriber) => (
                <tr key={subscriber._id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(subscriber.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribersPage;
