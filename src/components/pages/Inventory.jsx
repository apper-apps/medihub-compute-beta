import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Inventory = () => {
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
        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Package" className="h-5 w-5 text-primary-500" />
              <span>Total Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">1,248</p>
            <p className="text-slate-600 text-sm">In stock items</p>
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