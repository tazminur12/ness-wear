import React from 'react';
import { 
  ShoppingBagIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const Overview = () => {
  const stats = [
    {
      name: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Total Orders',
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingBagIcon,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Total Customers',
      value: '1,234',
      change: '+15.3%',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: ChartBarIcon,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', product: 'Blue Denim Jacket', amount: '$89.99', status: 'Completed', date: '2 hours ago' },
    { id: '#12346', customer: 'Sarah Wilson', product: 'White Summer Dress', amount: '$129.99', status: 'Processing', date: '4 hours ago' },
    { id: '#12347', customer: 'Mike Johnson', product: 'Black Leather Shoes', amount: '$199.99', status: 'Shipped', date: '6 hours ago' },
    { id: '#12348', customer: 'Emily Brown', product: 'Red Handbag', amount: '$79.99', status: 'Pending', date: '8 hours ago' },
  ];

  const topProducts = [
    { name: 'Blue Denim Jacket', sales: 156, revenue: '$13,944' },
    { name: 'White Summer Dress', sales: 134, revenue: '$17,419' },
    { name: 'Black Leather Shoes', sales: 98, revenue: '$19,599' },
    { name: 'Red Handbag', sales: 87, revenue: '$6,959' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2 flex-wrap">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-1 hidden sm:inline">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 space-y-2 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{order.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{order.customer}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{order.product}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Top Products</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button className="flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:-translate-y-1">
            <ShoppingBagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="font-medium text-sm sm:text-base">Add New Product</span>
          </button>
          <button className="flex items-center justify-center p-3 sm:p-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 transform hover:-translate-y-1">
            <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="font-medium text-sm sm:text-base">View Customers</span>
          </button>
          <button className="flex items-center justify-center p-3 sm:p-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 transform hover:-translate-y-1">
            <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="font-medium text-sm sm:text-base">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
