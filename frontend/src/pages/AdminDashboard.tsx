// import React from 'react';
// import {Star, Image, Settings } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const AdminDashboard: React.FC = () => {
//   // const [activeTab, setActiveTab] = useState('products');
//   // const [showAddProductModal, setShowAddProductModal] = useState(false);
//   // const [showUploadImageModal, setShowUploadImageModal] = useState(false);

//   // const products = [
//   //   {
//   //     id: 1,
//   //     name: '4K CCTV Camera',
//   //     category: 'CCTV Cameras',
//   //     price: '₹5,999',
//   //     stock: 10,
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Gaming CPU',
//   //     category: 'Computer CPUs',
//   //     price: '₹25,999',
//   //     stock: 5,
//   //   },
//   //   // Add more products as needed
//   // ];

//   // const reviews = [
//   //   {
//   //     id: 1,
//   //     name: 'John Doe',
//   //     email: 'john@example.com',
//   //     rating: 5,
//   //     comment: 'Excellent service and quality products.',
//   //     date: '2024-03-15',
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Jane Smith',
//   //     email: 'jane@example.com',
//   //     rating: 4,
//   //     comment: 'Great selection of products.',
//   //     date: '2024-03-10',
//   //   },
//   //   // Add more reviews as needed
//   // ];

//   const features = [
//     {
//       name: 'Manage Reviews',
//       description: 'View and manage customer reviews',
//       icon: Star,
//       path: '/admin/reviews',
//     },
//     {
//       name: 'Upload Images',
//       description: 'Upload and manage product images',
//       icon: Image,
//       path: '/admin/images',
//     },
//     {
//       name: 'Settings',
//       description: 'Configure store settings',
//       icon: Settings,
//       path: '/admin/settings',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Admin Dashboard
//           </h2>
//           <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
//             Manage your store's content and settings
//           </p>
//         </div>

//         <div className="mt-12">
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {features.map((feature) => (
//               <Link
//                 key={feature.name}
//                 to={feature.path}
//                 className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-lg hover:shadow-lg transition-shadow duration-200"
//               >
//                 <div>
//                   <span className="rounded-lg inline-flex p-3 bg-orange-50 text-orange-500 ring-4 ring-white">
//                     <feature.icon className="h-6 w-6" aria-hidden="true" />
//                   </span>
//                 </div>
//                 <div className="mt-8">
//                   <h3 className="text-lg font-medium">
//                     <span className="absolute inset-0" aria-hidden="true" />
//                     {feature.name}
//                   </h3>
//                   <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
//                 </div>
//                 <span
//                   className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
//                   aria-hidden="true"
//                 >
//                   <svg
//                     className="h-6 w-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
//                   </svg>
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard; 

import { Link } from 'react-router-dom';
import {
  Package,
  MessageSquare,
  Mail,
  BadgePercent,
  LayoutDashboard,
  QrCode
} from 'lucide-react';


const AdminDashboard = () => {
  const cards = [
    {
      name: 'Manage Products',
      description: 'Create, update, or delete product listings.',
      icon: <Package className="h-8 w-8 text-orange-500" />,
      to: '/admin/products',
    },
    {
      name: 'Customer Reviews',
      description: 'View and manage customer reviews.',
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />,
      to: '/admin/reviews',
    },
    {
      name: 'Newsletter Subscribers',
      description: 'See who subscribed to your newsletter.',
      icon: <Mail className="h-8 w-8 text-orange-500" />,
      to: '/admin/subscriber',
    },
    // {
    //   name: 'Registered Users',
    //   description: 'View all signed-up users.',
    //   icon: <Users className="h-8 w-8 text-orange-500" />,
    //   to: '/admin/users',
    // },
    {
      name: 'Promotional Campaigns',
      description: 'Manage banners, offers, and discount campaigns.',
      icon: <BadgePercent className="h-8 w-8 text-orange-500" />,
      to: '/admin/promotions',
    },
    {
      name: 'QR Code Generate',
      description: 'Generate your website QR code.',
      icon: <QrCode className="h-8 w-8 text-orange-500" />,
      to: '/admin/qrcode',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <LayoutDashboard className="mx-auto h-12 w-12 text-orange-500" />
          <h1 className="text-3xl font-extrabold text-gray-900 mt-4">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome, Admin. Manage all your store operations from one place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.to}
              className="bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl p-6 flex flex-col items-start hover:scale-[1.01]"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
