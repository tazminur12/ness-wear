import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon,
  BellIcon,
  DocumentTextIcon,
  TruckIcon,
  CreditCardIcon,
  XMarkIcon,
  Squares2X2Icon,
  TagIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose, setActiveTab }) => {
  const location = useLocation();
  
  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon, href: '/dashboard/overview' },
    { id: 'products', name: 'Products', icon: ShoppingBagIcon, href: '/dashboard/products' },
    { id: 'categories', name: 'Categories', icon: Squares2X2Icon, href: '/dashboard/categories' },
    { id: 'subcategories', name: 'SubCategories', icon: TagIcon, href: '/dashboard/subcategories' },
    { id: 'orders', name: 'Orders', icon: DocumentTextIcon, href: '/dashboard/orders' },
    { id: 'customers', name: 'Customers', icon: UserGroupIcon, href: '/dashboard/customers' },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon, href: '/dashboard/analytics' },
    { id: 'shipping', name: 'Shipping', icon: TruckIcon, href: '/dashboard/shipping' },
    { id: 'payments', name: 'Payments', icon: CreditCardIcon, href: '/dashboard/payments' },
    { id: 'notifications', name: 'Notifications', icon: BellIcon, href: '/dashboard/notifications' },
    { id: 'settings', name: 'Settings', icon: CogIcon, href: '/dashboard/settings' },
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    onClose(); // Close mobile sidebar when item is clicked
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 lg:w-64
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">NESS WEAR</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || (location.pathname === '/dashboard' && item.id === 'overview');
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }
                  `}
                >
                  <item.icon className={`
                    w-5 h-5 mr-3 transition-colors duration-200
                    ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-600'}
                  `} />
                  <span>{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 font-body truncate">Admin User</p>
              <p className="text-xs text-gray-500 font-body truncate">admin@nesswear.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
