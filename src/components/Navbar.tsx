import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-2xl font-bold tracking-wide">TaskManager</h1>
            <div className="flex space-x-6 text-lg font-semibold">
            <Link to="/" className="hover:text-gray-400 transition">Home</Link>
            <Link to="/notes" className="hover:text-gray-400 transition">Notes</Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
