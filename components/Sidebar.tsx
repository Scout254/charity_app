import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FiHome, FiUser, FiLogOut } from 'react-icons/fi';

function Sidebar() {
  const router = useRouter();
  
  return (
    <div className='bg-gray-200 h-screen sticky bottom-0  px-2 pt-20 shadow-md'>
      <Link href="/">
        <div className={`flex items-center py-2 px-3 rounded-lg ${router.pathname === '/' ? 'bg-gray-300' : ''}`}>
          <FiHome className="w-5 h-5 mr-2" />
          <h1 className="text-lg font-medium">
            <span className="hidden sm:inline-block">Dashboard</span>
            <span className="sm:hidden"> <FiHome /> </span>
          </h1>
        </div>
      </Link>
      <Link href="/profile">
        <div className={`flex items-center py-2 px-3 rounded-lg ${router.pathname === '/profile' ? 'bg-gray-300' : ''}`}>
          <FiUser className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-medium">
            <span className="hidden sm:inline-block">Profile</span>
            <span className="sm:hidden"> <FiUser /> </span>
          </h2>
        </div>
      </Link>
      <Link href="/">
        <div className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-200">
          <FiLogOut className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-medium">
            <span className="hidden sm:inline-block">Logout</span>
            <span className="sm:hidden"> <FiLogOut /> </span>
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
