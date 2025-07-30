import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Billing = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Billing & Finance</h1>
          <p className="mt-2 text-slate-600">
            Manage patient billing, invoices, and financial records
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Create Invoice</span>
        </Button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="DollarSign" className="h-5 w-5 text-emerald-500" />
              <span>Total Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">$124,580</p>
            <p className="text-emerald-600 text-sm">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="FileText" className="h-5 w-5 text-primary-500" />
              <span>Pending Invoices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">42</p>
            <p className="text-slate-600 text-sm">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Clock" className="h-5 w-5 text-amber-500" />
              <span>Overdue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">$8,420</p>
            <p className="text-slate-600 text-sm">7 overdue invoices</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="CheckCircle" className="h-5 w-5 text-emerald-500" />
              <span>Paid Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">$12,840</p>
            <p className="text-slate-600 text-sm">18 payments received</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="CreditCard" className="h-10 w-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Billing & Finance Management</h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Comprehensive billing system for patient invoices, insurance claims, payment processing, 
            and financial reporting with automated notifications and payment tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>
              <ApperIcon name="FileText" className="h-4 w-4 mr-2" />
              View Invoices
            </Button>
            <Button variant="outline">
              <ApperIcon name="BarChart3" className="h-4 w-4 mr-2" />
              Financial Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border-l-4 border-emerald-500 bg-emerald-50">
              <div className="flex items-center space-x-3">
                <ApperIcon name="ArrowDownLeft" className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Payment Received</p>
                  <p className="text-xs text-slate-600">INV-2024-001 - John Smith</p>
                </div>
              </div>
              <span className="font-semibold text-emerald-600">+$1,250</span>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-primary-500 bg-primary-50">
              <div className="flex items-center space-x-3">
                <ApperIcon name="FileText" className="h-4 w-4 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Invoice Created</p>
                  <p className="text-xs text-slate-600">INV-2024-042 - Sarah Johnson</p>
                </div>
              </div>
              <span className="font-semibold text-slate-600">$890</span>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-emerald-500 bg-emerald-50">
              <div className="flex items-center space-x-3">
                <ApperIcon name="ArrowDownLeft" className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Insurance Claim</p>
                  <p className="text-xs text-slate-600">CL-2024-018 - Blue Cross</p>
                </div>
              </div>
              <span className="font-semibold text-emerald-600">+$3,200</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Insurance</span>
                  <span className="text-slate-900">65%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Cash</span>
                  <span className="text-slate-900">20%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Credit Card</span>
                  <span className="text-slate-900">12%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Other</span>
                  <span className="text-slate-900">3%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "3%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;