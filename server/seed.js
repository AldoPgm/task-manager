const db = require('./db');

const initialTodos = [
    "Buy organic milk and eggs",
    "Schedule dentist appointment for Tuesday",
    "Draft project proposal for Q3",
    "Call mom to wish happy birthday",
    "Pay electricity bill",
    "Research reactant patterns",
    "Clean the garage",
    "Book flight tickets for vacation"
];

console.log("Seeding database...");

db.serialize(() => {
    db.run("DELETE FROM todos"); // Clear existing

    const stmt = db.prepare("INSERT INTO todos (text, completed) VALUES (?, 0)");
    initialTodos.forEach(todo => {
        stmt.run(todo);
    });
    stmt.finalize();

    console.log(`Inserted ${initialTodos.length} todos.`);
});

db.close();
