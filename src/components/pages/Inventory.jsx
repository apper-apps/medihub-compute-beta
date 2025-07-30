import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { toast } from "react-toastify";

const Inventory = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'list'
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(1248);

  // Filter items based on search term
  const filteredItems = inventoryItems.filter(item =>
    item.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch inventory items using ApperClient
  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description" } },
          { field: { Name: "quantity" } },
          { field: { Name: "itemId" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords('inventory', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        setError(response.message);
        return;
      }

      if (!response.data || response.data.length === 0) {
        setInventoryItems([]);
        setTotalCount(0);
      } else {
        setInventoryItems(response.data);
        setTotalCount(response.total || response.data.length);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      console.error("Error fetching inventory items:", errorMessage);
      toast.error("Failed to load inventory items");
      setError(errorMessage);
      setInventoryItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Total Items card click
  const handleTotalItemsClick = () => {
    setCurrentView('list');
    if (inventoryItems.length === 0) {
      fetchInventoryItems();
    }
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSearchTerm('');
  };

  if (currentView === 'list') {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">All Inventory Items</h1>
          </div>
        </div>

        {/* Search bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search inventory items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button>
                <ApperIcon name="Search" className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading state */}
        {loading && (
          <Card>
            <CardContent className="text-center py-16">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin">
                  <ApperIcon name="Loader2" className="h-6 w-6 text-primary-500" />
                </div>
                <span className="text-slate-600">Loading inventory items...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error state */}
        {error && !loading && (
          <Card>
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Items</h3>
              <p className="text-slate-600 mb-4">{error}</p>
              <Button onClick={fetchInventoryItems}>
                <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Items list */}
        {!loading && !error && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Inventory Items ({filteredItems.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Package" className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Items Found</h3>
                  <p className="text-slate-600">
                    {searchTerm ? 'No items match your search criteria.' : 'No inventory items available.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop table view */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Quantity</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Item</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Tags</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item) => (
                          <tr key={item.Id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-slate-900">{item.Name || 'N/A'}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-slate-600 max-w-xs truncate">
                                {item.description || 'No description'}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className={`font-semibold ${
                                item.quantity > 50 ? 'text-emerald-600' : 
                                item.quantity > 10 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {item.quantity || 0}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-slate-600">
                                {item.itemId?.Name || 'No item linked'}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-slate-600">
                                {item.Tags || 'No tags'}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile card view */}
                  <div className="md:hidden space-y-4">
                    {filteredItems.map((item) => (
                      <div key={item.Id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-900">{item.Name || 'N/A'}</h3>
                          <div className={`font-bold ${
                            item.quantity > 50 ? 'text-emerald-600' : 
                            item.quantity > 10 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {item.quantity || 0}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {item.description || 'No description'}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Item: {item.itemId?.Name || 'No item linked'}
                          </span>
                          <span className="text-slate-500">
                            {item.Tags || 'No tags'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="mt-2 text-slate-600">
            Track medical supplies, equipment, and medications
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Item</span>
        </Button>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<Card 
          className="hover:shadow-medium transition-shadow cursor-pointer"
          onClick={handleTotalItemsClick}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Package" className="h-5 w-5 text-primary-500" />
              <span>Total Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">{totalCount.toLocaleString()}</p>
            <p className="text-slate-600 text-sm">Click to view all items</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="AlertTriangle" className="h-5 w-5 text-amber-500" />
              <span>Low Stock</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">23</p>
            <p className="text-slate-600 text-sm">Items need reorder</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="XCircle" className="h-5 w-5 text-red-500" />
              <span>Out of Stock</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">8</p>
            <p className="text-slate-600 text-sm">Critical items</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Clock" className="h-5 w-5 text-sky-500" />
              <span>Expiring Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-sky-600">15</p>
            <p className="text-slate-600 text-sm">Within 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Package" className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Inventory Management System</h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Comprehensive inventory tracking for medical supplies, equipment, and medications. 
            Monitor stock levels, expiration dates, and automated reorder alerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>
              <ApperIcon name="Package" className="h-4 w-4 mr-2" />
              View Inventory
            </Button>
            <Button variant="outline">
              <ApperIcon name="BarChart3" className="h-4 w-4 mr-2" />
              Stock Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Pill" className="h-4 w-4 text-primary-600" />
                </div>
                <span className="font-medium text-slate-900">Medications</span>
              </div>
              <span className="text-slate-600">342 items</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Activity" className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="font-medium text-slate-900">Medical Equipment</span>
              </div>
              <span className="text-slate-600">186 items</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Bandage" className="h-4 w-4 text-amber-600" />
                </div>
                <span className="font-medium text-slate-900">Surgical Supplies</span>
              </div>
              <span className="text-slate-600">294 items</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                  <ApperIcon name="TestTube" className="h-4 w-4 text-sky-600" />
                </div>
                <span className="font-medium text-slate-900">Lab Supplies</span>
              </div>
              <span className="text-slate-600">426 items</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border-l-4 border-emerald-500 bg-emerald-50">
              <ApperIcon name="Plus" className="h-4 w-4 text-emerald-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Stock Added</p>
                <p className="text-xs text-slate-600">Paracetamol 500mg - 200 units</p>
              </div>
              <span className="text-xs text-slate-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border-l-4 border-amber-500 bg-amber-50">
              <ApperIcon name="AlertTriangle" className="h-4 w-4 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Low Stock Alert</p>
                <p className="text-xs text-slate-600">Surgical masks - 15 units left</p>
              </div>
              <span className="text-xs text-slate-500">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border-l-4 border-red-500 bg-red-50">
              <ApperIcon name="XCircle" className="h-4 w-4 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Out of Stock</p>
                <p className="text-xs text-slate-600">Insulin pens - Urgent reorder</p>
              </div>
              <span className="text-xs text-slate-500">6 hours ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;