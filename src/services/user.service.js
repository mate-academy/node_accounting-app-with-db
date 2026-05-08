// let nextId = 1;

// const getUsers = () => {
//   return User.findAll();
// };

// const getUser = (id) => {
//   return usersList.find((user) => user.id === Number(id));
// };

// const createUser = (name) => {
//   const user = {
//     id: nextId++,
//     name,
//   };
//
//   usersList.push(user);
//
//   return user;
// };
//
// const updateUser = (id, name) => {
//   const userForUpdate = usersList.find((user) => user.id === Number(id));
//
//   if (!userForUpdate) {
//     return null;
//   }
//
//   userForUpdate.name = name;
//
//   return userForUpdate;
// };
//
// const deleteUser = (id) => {
//   const userForDelete = usersList.find((user) => user.id === Number(id));
//
//   if (!userForDelete) {
//     return null;
//   }
//
//   usersList = usersList.filter((user) => user.id !== Number(id));
//
//   return userForDelete;
// };
//
// module.exports = {
//   createUser,
//   updateUser,
//   deleteUser,
// };
