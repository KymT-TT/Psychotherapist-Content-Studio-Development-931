import React, {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiHome, FiUser, FiEdit3, FiVideo, FiBookOpen, FiSparkles, FiMenu, FiX} = FiIcons;

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // UPDATED: Menu item now reflects Viral Reel Generator
  const menuItems = [
    {path: '/', icon: FiHome, label: 'Dashboard'},
    {path: '/brand-builder', icon: FiUser, label: 'Brand Builder'},
    {path: '/post-generator', icon: FiEdit3, label: 'Post Generator'},
    {path: '/template-gallery', icon: FiVideo, label: 'Viral Reels'},
    {path: '/content-vault', icon: FiBookOpen, label: 'Content Vault'}
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Overlay - Only on mobile when sidebar is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={closeSidebar}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Always visible on desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:shadow-lg lg:border-r lg:border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiSparkles} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Social Media</h1>
              <p className="text-sm text-gray-500">Content Planner</p>
            </div>
          </div>
        </div>

        <nav className="px-4 pb-4 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({isActive}) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({isActive}) => (
                    <>
                      <SafeIcon
                        icon={item.icon}
                        className={`w-5 h-5 mr-3 ${
                          isActive ? 'text-primary-600' : 'text-gray-400'
                        }`}
                      />
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                          initial={{scale: 0}}
                          animate={{scale: 1}}
                          transition={{type: "spring", stiffness: 500, damping: 30}}
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

      {/* Mobile Sidebar - Slides in from left on mobile */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
          transition: {type: 'spring', stiffness: 300, damping: 30}
        }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiSparkles} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Social Media</h1>
              <p className="text-sm text-gray-500">Content Planner</p>
            </div>
          </div>
        </div>

        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({isActive}) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({isActive}) => (
                    <>
                      <SafeIcon
                        icon={item.icon}
                        className={`w-5 h-5 mr-3 ${
                          isActive ? 'text-primary-600' : 'text-gray-400'
                        }`}
                      />
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                          initial={{scale: 0}}
                          animate={{scale: 1}}
                          transition={{type: "spring", stiffness: 500, damping: 30}}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;