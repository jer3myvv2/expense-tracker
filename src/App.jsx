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
    <div style={styles.container}>
      <h2 style={styles.heading}>Expense Tracker</h2>

      {/* Summary Cards */}
      <div style={styles.summaryContainer}>
        <div style={{ ...styles.card, ...styles.incomeCard }}>
          <h3>Total Income</h3>
          <p style={styles.amountText}>${totalIncome.toFixed(2)}</p>
        </div>
        <div style={{ ...styles.card, ...styles.expenseCard }}>
          <h3>Total Expense</h3>
          <p style={styles.amountText}>${totalExpense.toFixed(2)}</p>
        </div>
        <div style={{ ...styles.card, ...styles.balanceCard }}>
          <h3>Net Balance</h3>
          <p style={styles.amountText}>${netBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Split Layout: Form Left, Transaction History Right */}
      <div style={styles.mainLayout}>
        {/* Left Column: Form Section */}
        <div style={styles.column}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3>{editId !== null ? 'Edit Transaction' : 'Add New Transaction'}</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                style={styles.input}
                step="0.01"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Food, Utilities)"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                placeholder="Add some details..."
                value={formData.description}
                onChange={handleInputChange}
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.button}>
              {editId !== null ? 'Update Transaction' : 'Add Transaction'}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{ ...styles.button, ...styles.cancelButton }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Right Column: Transaction History Section */}
        <div style={styles.column}>
          <h3>Transaction History</h3>
          {transactions.length === 0 ? (
            <p style={styles.emptyText}>No transactions added yet.</p>
          ) : (
            <ul style={styles.list}>
              {transactions.map((t) => (
                <li
                  key={t.id}
                  style={{
                    ...styles.listItem,
                    borderLeft: t.type === 'income' ? '4px solid #10b981' : '4px solid #ef4444'
                  }}
                >
                  <div style={styles.listContent}>
                    <div>
                      <strong>{t.title}</strong>
                      <span style={styles.badge}>{t.category || 'Uncategorized'}</span>
                      <p style={styles.desc}>{t.description}</p>
                    </div>
                    <div style={styles.listRight}>
                      <span style={styles.date}>{t.date}</span>
                      <span
                        style={{
                          ...styles.amount,
                          color: t.type === 'income' ? '#10b981' : '#ef4444'
                        }}
                      >
                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                      </span>
                      <div style={styles.actions}>
                        <button
                          onClick={() => handleEdit(t.id)}
                          style={{ ...styles.actionBtn, ...styles.editBtn }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                        >
                          Delete
                        </button>
                      </div>
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

// Inline Styles
const styles = {
  container: {
    maxWidth: '1100px',
    margin: '30px auto',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '20px'
  },
  summaryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '32px'
  },
  card: {
    flex: 1,
    padding: '16px',
    borderRadius: '6px',
    color: '#ffffff',
    textAlign: 'center'
  },
  incomeCard: { backgroundColor: '#10b981' },
  expenseCard: { backgroundColor: '#ef4444' },
  balanceCard: { backgroundColor: '#3b82f6' },
  amountText: { fontSize: '24px', fontWeight: 'bold', margin: '8px 0 0' },
  mainLayout: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  column: {
    flex: '1 1 450px',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    backgroundColor: '#f3f4f6',
    padding: '20px',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4b5563'
  },
  input: {
    padding: '8px 10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px'
  },
  select: {
    padding: '8px 10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px'
  },
  textarea: {
    padding: '8px 10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '60px',
    resize: 'vertical'
  },
  button: {
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    marginTop: '0px'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    maxHeight: '520px',
    overflowY: 'auto'
  },
  listItem: {
    padding: '12px 16px',
    marginBottom: '10px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '4px'
  },
  listContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  },
  badge: {
    fontSize: '11px',
    backgroundColor: '#e5e7eb',
    padding: '2px 8px',
    borderRadius: '12px',
    marginLeft: '8px'
  },
  desc: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '6px 0 0'
  },
  listRight: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  date: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  amount: {
    fontWeight: 'bold',
    fontSize: '15px'
  },
  actions: {
    display: 'flex',
    gap: '6px',
    marginTop: '8px'
  },
  actionBtn: {
    border: 'none',
    borderRadius: '4px',
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    color: '#ffffff'
  },
  editBtn: {
    backgroundColor: '#3b82f6'
  },
  deleteBtn: {
    backgroundColor: '#ef4444'
  },
  emptyText: {
    color: '#6b7280',
    fontStyle: 'italic'
  }
};
