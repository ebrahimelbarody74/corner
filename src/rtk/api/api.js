// export default handleDelete = async (api) => {

//   try {
//     const res = await axios.delete(
//       "api" + e.id,

//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(res);
//     if (res.data) {
//       const res = await axios.get(
//         "https://wearher-from-mimi.com/api/profile/" + user.user_id,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(res.data.data);
//       dispatch(loginSuccess(res.data.data));
//     }
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "حدث خطأ فى الشبكه",
//       // text: "Something went wrong!",
//       // footer: '<a href="">Why do I have this issue?</a>',
//     });
//     console.log(err);
//   }
// };
