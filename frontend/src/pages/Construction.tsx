import { Helmet } from 'react-helmet';

const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <Helmet>
        <title>Under Construction</title>
      </Helmet>

      <div className="max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-yellow-500 text-6xl">🚧</div>
        <h1 className="text-2xl font-bold text-gray-800">Page Under Construction</h1>
        <p className="text-gray-600">
          We're working hard to bring this page to life. Please check back soon!
        </p>
        <div className="text-sm text-gray-400">— Your Website Team</div>
      </div>
    </div>
  );
};

export default UnderConstruction;
