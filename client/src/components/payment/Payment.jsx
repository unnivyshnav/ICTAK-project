// import axios from "axios";
// import { useState } from "react";
// import "./payment.css";

// import React from "react";

// export default function Payment() {
//   const [book, setBook] = useState({
//     name: "The Fault in our stars",
//     author: " Vyshnav",
//     img: "https://ictkerala.org/wp-content/uploads/2019/01/cropped-ict-ico.png",
//     price: 250,
//   });
//   const initPayment = (data) => {
//     const options = {
//       key: "rzp_test_oFO1alVZCivFv0",
//       amount: data.amount,
//       currency: data.currency,
//       name: book.name,
//       description: "Test Transaction",
//       image: book.img,
//       order_id: data.id,
//       handler: async (response) => {
//         try {
//           const verifyUrl =
//             "https://ictak-project.herokuapp.com/api/payment/verify";
//           const { data } = await axios.post(verifyUrl, response);
//           console.log(data);
//         } catch (error) {
//           console.log(error);
//         }
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   const handlePayment = async () => {
//     try {
//       const orderUrl = "https://ictak-project.herokuapp.com/api/payment/orders";
//       const { data } = await axios.post(orderUrl, { amount: book.price });
//       console.log(data);
//       initPayment(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="book_container">
//         <img src={book.img} alt="book_img" className="book_img" />
//         <p className="book_name">{book.name}</p>
//         <p className="book_author">By {book.author}</p>
//         <p className="book_price">
//           Price : <span>&#x20B9; {}</span>
//         </p>
//         <button onClick={handlePayment} className="buy_btn">
//           buy now
//         </button>
//       </div>
//     </div>
//   );
// }
