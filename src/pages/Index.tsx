import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  ShoppingCart,
  UtensilsCrossed,
  Car,
  Home,
  Plus,
  Calculator,
  X,
  Filter,
  Calendar,
} from "lucide-react";
import Header from "./components/Header";

const Index = () => {
  const [expenses, setExpenses] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substr(0, 7)
  );
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    { name: "Food", icon: UtensilsCrossed },
    { name: "Grocery", icon: ShoppingCart },
    { name: "Transport", icon: Car },
    { name: "Rent", icon: Home },
    { name: "Other", icon: DollarSign },
  ];

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          ...newExpense,
          amount: parseFloat(newExpense.amount),
        },
      ]);
      setNewExpense({
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
      setShowAddPopup(false);
    }
  };

  const getSelectedMonthTotal = () => {
    const [year, month] = selectedMonth.split("-").map(Number);

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === month - 1 &&
          expenseDate.getFullYear() === year
        );
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getCategoryTotal = (categoryName) => {
    const [year, month] = selectedMonth.split("-").map(Number);

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expense.category === categoryName &&
          expenseDate.getMonth() === month - 1 &&
          expenseDate.getFullYear() === year
        );
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getFilteredExpenses = () => {
    const [year, month] = selectedMonth.split("-").map(Number);

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        const matchesMonth =
          expenseDate.getMonth() === month - 1 &&
          expenseDate.getFullYear() === year;
        const matchesDate = !filterDate || expense.date === filterDate;
        return matchesMonth && matchesDate;
      })
      .sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate());
  };

  const getMonthName = (monthString) => {
    const date = new Date(monthString + "-01");
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
     <Header />
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
        {/* Monthly Summary - Now at Top */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Calculator className="h-5 w-5" />
              Monthly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="month"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Select Month
                  </Label>
                  <Input
                    id="month"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${getSelectedMonthTotal().toFixed(2)}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Total spent in {getMonthName(selectedMonth)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => {
                const total = getCategoryTotal(category.name);
                return (
                  <div
                    key={category.name}
                    className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <category.icon className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      ${total.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {category.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Add New Expense Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAddPopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Expense
          </Button>
        </div>

        {/* Expense List with Filters */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-gray-900 dark:text-gray-100">
                {getMonthName(selectedMonth)} Expenses
              </CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  placeholder="Filter by date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-40 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500"
                />
                {filterDate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterDate("")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getFilteredExpenses().length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No expenses found for the selected period.
                </div>
              ) : (
                getFilteredExpenses().map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {categories.find((cat) => cat.name === expense.category)
                        ?.icon &&
                        React.createElement(
                          categories.find(
                            (cat) => cat.name === expense.category
                          ).icon,
                          {
                            className:
                              "h-5 w-5 text-blue-600 dark:text-blue-400",
                          }
                        )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {expense.category}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      ${expense.amount.toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {showAddPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Add New Expense
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="popup-category"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Category
                </Label>
                <select
                  id="popup-category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="popup-amount"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Amount ($)
                </Label>
                <Input
                  id="popup-amount"
                  type="number"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="popup-date"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Date
                </Label>
                <Input
                  id="popup-date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, date: e.target.value })
                  }
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddPopup(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addExpense}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
