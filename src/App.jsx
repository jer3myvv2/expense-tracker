import React, { useState } from 'react';

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2026-05-01',
      title: 'May Salary',
      description: 'Monthly salary deposit from company',
      category: 'Salary',
      amount: 3500.00,
      type: 'income'
    },
    {
      id: 2,
      date: '2026-05-02',
      title: 'Weekly Groceries',
      description: 'Bought vegetables and meat from local market',
      category: 'Groceries',
      amount: 150.50,
      type: 'expense'
    }
  ]);

  const [formData, setFormData] = useState({
    date: '',
    title: '',
    description: '',
    category: '',
    amount: '',
    type: 'expense'
  });

  const [editId, setEditId] = useState(null);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or Update Transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) return;

    if (editId !== null) {
      setTransactions(
        transactions.map((t) =>
          t.id === editId
            ? { ...t, ...formData, amount: parseFloat(formData.amount) }
            : t
        )
      );
      setEditId(null);
    } else {
      const newTransaction = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount)
      };
      setTransactions([...transactions, newTransaction]);
    }

    setFormData({
      date: '',
      title: '',
      description: '',
      category: '',
      amount: '',
      type: 'expense'
    });
  };

  // Delete Transaction
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Edit Transaction (populate form)
  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setFormData({
      date: transaction.date,
      title: transaction.title,
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      type: transaction.type
    });
    setEditId(id);
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      date: '',
      title: '',
      description: '',
      category: '',
      amount: '',
      type: 'expense'
    });
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg my-10 font-sans">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Expense Tracker</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-lg text-white text-center shadow-md bg-emerald-500">
          <h3 className="text-lg font-medium opacity-90">Total Income</h3>
          <p className="text-3xl font-bold mt-2">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-6 rounded-lg text-white text-center shadow-md bg-rose-500">
          <h3 className="text-lg font-medium opacity-90">Total Expense</h3>
          <p className="text-3xl font-bold mt-2">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="p-6 rounded-lg text-white text-center shadow-md bg-blue-600">
          <h3 className="text-lg font-medium opacity-90">Net Balance</h3>
          <p className="text-3xl font-bold mt-2">${netBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Split Layout: Form Left, Transaction History Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Column: Form Section */}
        <div>
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 border-gray-200">
              {editId !== null ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
                className="p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
                step="0.01"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Food, Utilities, Salary"
                value={formData.category}
                onChange={handleInputChange}
                className="p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700 bg-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
              <textarea
                name="description"
                placeholder="Add some details..."
                value={formData.description}
                onChange={handleInputChange}
                className="p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700 resize-none h-20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-150 font-semibold shadow-sm mt-2"
            >
              {editId !== null ? 'Update Transaction' : 'Add Transaction'}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition duration-150 font-semibold shadow-sm"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Right Column: Transaction History Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3 border-gray-200">Transaction History</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 italic text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              No transactions added yet.
            </p>
          ) : (
            <ul className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className={`p-4 bg-white border border-gray-200 shadow-sm rounded-r-md flex justify-between items-center gap-6 ${
                    t.type === 'income' ? 'border-l-4 border-emerald-500' : 'border-l-4 border-rose-500'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <strong className="text-gray-800 truncate text-base">{t.title}</strong>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">
                        {t.category || 'Uncategorized'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.description || 'No description provided.'}</p>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs text-gray-400 font-medium">{t.date}</span>
                    <span
                      className={`text-base font-bold mt-0.5 ${
                        t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </span>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(t.id)}
                        className="text-xs bg-blue-500 text-white px-2.5 py-1 rounded hover:bg-blue-600 transition duration-150 shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-xs bg-rose-500 text-white px-2.5 py-1 rounded hover:bg-rose-600 transition duration-150 shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

