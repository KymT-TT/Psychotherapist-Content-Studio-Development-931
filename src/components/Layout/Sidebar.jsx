import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiHome, FiUser, FiCalendar, FiEdit3, FiImage, FiBookOpen, FiSparkles 
} = FiIcons;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/brand-builder', icon: FiUser, label: 'Brand Builder' },
    { path: '/content-calendar', icon: FiCalendar, label: 'Content Calendar' },
    { path: '/post-generator', icon: FiEdit3, label: 'Post Generator' },
    { path: '/template-gallery', icon: FiImage, label: 'Template Gallery' },
    { path: '/content-vault', icon: FiBookOpen, label: 'Content Vault' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiSparkles} className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Clarity</h1>
            <p className="text-sm text-gray-500">Content Studio</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <SafeIcon 
                      icon={item.icon} 
                      className={`w-5 h-5 mr-3 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} 
                    />
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;