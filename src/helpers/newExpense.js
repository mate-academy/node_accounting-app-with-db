class Expense {
  constructor(userId, spentAt, title, amount, category, note) {
    this.id = Date.now();
    this.userId = userId;
    this.spentAt = spentAt;
    this.title = title;
    this.amount = amount;
    this.category = category;
    this.note = note;
  }
}

module.exports = { Expense };
