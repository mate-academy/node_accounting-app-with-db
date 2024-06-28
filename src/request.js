const axios = require('axios');

// const user = {
//   name: 'John Doe',
// };

// const newUser = {
//   name: 'Doe',
// };

// // GET all users
// axios
//   .get('http://localhost:5700/users/')
//   .then((res) => {
//     console.log('GET all users status:', res.status);
//     console.log('GET all users data:', res.data);
//   })
//   .catch((error) => {
//     handleError(error, 'GET all users');
// });

// //POST create a new user
// axios
//   .post('http://localhost:5700/users/', user)
//   .then((response) => {
//     console.log('User created:', response.data);
//   })
//   .catch((error) => {
//     handleError(error, 'POST create a new user');
//   });

// // // // GET a specific user by ID
// // // axios
// // //   .get('http://localhost:5700/users/15')
// // //   .then((res) => {
// // //     console.log('GET user by ID status:', res.status);
// // //     console.log('GET user by ID data:', res.data);
// // //   })
// // //   .catch((error) => {
// // //     handleError(error, 'GET user by ID');
// // //   });

// // // // DELETE a specific user by ID
// // // axios
// // //   .delete('http://localhost:5700/users/24')
// // //   .then((res) => {
// // //     console.log('DELETE user by ID status:', res.status);
// // //     console.log('DELETE user by ID data:', res.data);
// // //   })
// // //   .catch((error) => {
// // //     handleError(error, 'DELETE user by ID');
// // //   });

// // // // UPDATE a specific user by ID
// // // axios
// // //   .patch('http://localhost:5700/users/12', newUser)
// // //   .then((res) => {
// // //     console.log('UPDATE user by ID status:', res.status);
// // //     console.log('UPDATE user by ID data:', res.data);
// // //   })
// // //   .catch((error) => {
// // //     handleError(error, 'UPDATE user by ID');
// // //   });

const expenses = {
  userId: 2,
  spentAt: new Date().toISOString(),
  title: 'qwer',
  amount: 2,
  category: 'string',
  // note: 'string',
};

// // const expensesFilter = {
// //   userId: '2',
// // };

// // // GET all expenses
// // axios
// //   .get('http://localhost:5700/expenses/', expensesFilter)
// //   .then((res) => {
// //     console.log('GET all expenses status:', res.status);
// //     console.log('GET all expenses data:', res.data);
// //   })
// //   .catch((error) => {
// //     handleError(error, 'GET all expenses');
// //   });

// Виклик POST запиту для створення нової витрати
axios
  .post('http://localhost:5700/expenses/', expenses)
  .then((res) => {
    console.log('POST expenses status:', res.status);
    console.log('POST expenses data:', res.data);
  })
  .catch((error) => {
    handleError(error, 'POST expenses');
  });

// // // Виклик GET ID запиту
// // axios
// //   .get('http://localhost:5700/expenses/1')
// //   .then((res) => {
// //     console.log('GET expenses by ID status:', res.status);
// //     console.log('GET expenses by ID data:', res.data);
// //   })
// //   .catch((error) => {
// //     handleError(error, 'GET expenses  by ID');
// //   });
    
// Визначення функції обробки помилок
function handleError(error, context) {
  console.error(`Error occurred in ${context}:`, error);
  // Додаткові дії для обробки помилок
}
