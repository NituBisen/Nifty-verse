// import React from "react";
// import { User, Mail, LockKeyhole } from "lucide-react";

// /* ==================================================
//    IMAGE IMPORT — replace with your real asset path.
// ================================================== */
// import astronautImage from "../assets/logo/create-account-astronaut.png";

// /* ==================================================
//    SECTION
// ================================================== */
// const CreateAccount = () => {
//   return (
//     <section className="w-full bg-[#000000]">
//       <div className="mx-auto px-4 py-14 max-w-[1400px] sm:px-6 md:py-20 lg:px-10">
//         <div className="overflow-hidden flex flex-col items-stretch rounded-2xl lg:flex-row">
//           {/* Left image */}
//           <div className="w-full shrink-0 lg:w-1/2">
//             <img
//               src={astronautImage}
//               alt="Astronauts approaching a spacecraft"
//               className="object-cover w-full h-[260px] min-h-[520px] sm:h-[360px] lg:h-full"
//             />
//           </div>

//           {/* Right form */}
//           <div className="flex items-center px-1 py-10 py-0 w-full w-1/2 bg-[#1e1c1c] sm:px-4 lg:px-12">
//             <div className="mx-auto w-full max-w-md lg:mx-0">
//               <h2
//   className="font-bold text-3xl text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text sm:text-4xl"
// >
//   Create Account
// </h2>

//               <p className="mt-4 text-gray-300 text-base leading-relaxed sm:text-lg">
//                 Welcome! Enter Your Details And Start Creating, Collecting
//                 And Selling NFTs.
//               </p>

//               <form className="flex flex-col gap-4 mt-8">
//                 <div className="relative">
//                   <User className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
//                   />
//                 </div>

//                 <div className="relative">
//                   <Mail className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
//                   />
//                 </div>

//                 <div className="relative">
//                   <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
//                   />
//                 </div>

//                 <div className="relative">
//                   <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
//                   <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-2 w-full h-[52px] text-white font-bold text-base bg-[#7a39d0] rounded-full transition-opacity hover:opacity-90 sm:h-[55px]"
//                 >
//                   Create account
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CreateAccount;





//backend api integration


// import React, { useState } from "react";
// import { User, Mail, LockKeyhole } from "lucide-react";
// import astronautImage from "../assets/logo/create-account-astronaut.png";

// const CreateAccount = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       setMessage(data.message);

//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full bg-[#000000]">
//       <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
//         <div className="flex flex-col items-stretch overflow-hidden rounded-2xl lg:flex-row">
//           {/* Left image */}
//           <div className="w-full shrink-0 lg:w-1/2">
//             <img
//               src={astronautImage}
//               alt="Astronauts approaching a spacecraft"
//               className="h-[520px] w-full object-cover sm:h-[360px] lg:h-full"
//             />
//           </div>

//           {/* Right form */}
//           <div className="flex w-full items-center bg-[#1e1c1c] px-1 py-10 sm:px-4 lg:w-1/2 lg:px-12 lg:py-0">
//             <div className="mx-auto w-full max-w-md lg:mx-0">
//               <h2 className="bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
//                 Create Account
//               </h2>

//               <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
//                 Welcome! Enter Your Details And Start Creating, Collecting
//                 And Selling NFTs.
//               </p>

//               <form
//                 onSubmit={handleSubmit}
//                 className="mt-8 flex flex-col gap-4"
//               >
//                 <div className="relative">
//                   <User className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Username"
//                     required
//                     className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
//                   />
//                 </div>

//                 <div className="relative">
//                   <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email Address"
//                     required
//                     className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
//                   />
//                 </div>

//                 <div className="relative">
//                   <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     required
//                     className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
//                   />
//                 </div>

//                 <div className="relative">
//                   <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm Password"
//                     required
//                     className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
//                   />
//                 </div>

//                 {error && (
//                   <p className="text-sm font-medium text-red-400">
//                     {error}
//                   </p>
//                 )}

//                 {message && (
//                   <p className="text-sm font-medium text-green-400">
//                     {message}
//                   </p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="mt-2 h-[52px] w-full rounded-full bg-[#7a39d0] text-base font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[55px]"
//                 >
//                   {loading ? "Creating Account..." : "Create account"}
//                 </button>
//               </form>

//                 {/*signin button*/}
//               <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
//                 <span className="text-sm text-gray-400">
//                   Already have an account?
//                 </span>

//                 <button
//                   type="button"
//                   onClick={() => window.location.href = "/signin"}
//                   className="text-sm font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CreateAccount;




import React, { useState } from "react";
import { User, Mail, LockKeyhole } from "lucide-react";
import astronautImage from "../assets/logo/create-account-astronaut.png";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = {
          message: text || "Signup failed",
        };
      }

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setMessage(data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#000000]">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <div className="flex flex-col items-stretch overflow-hidden rounded-2xl lg:flex-row">
          {/* Left image */}
          <div className="w-full shrink-0 lg:w-1/2">
            <img
              src={astronautImage}
              alt="Astronauts approaching a spacecraft"
              className="h-[520px] w-full object-cover sm:h-[360px] lg:h-full"
            />
          </div>

          {/* Right form */}
          <div className="flex w-full items-center bg-[#1e1c1c] px-1 py-10 sm:px-4 lg:w-1/2 lg:px-12 lg:py-0">
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <h2 className="bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                Welcome! Enter Your Details And Start Creating, Collecting
                And Selling NFTs.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4"
              >
                <div className="relative">
                  <User className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
                  />
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
                  />
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-red-400">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="text-sm font-medium text-green-400">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-[52px] w-full rounded-full bg-[#7a39d0] text-base font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[55px]"
                >
                  {loading ? "Creating Account..." : "Create account"}
                </button>
              </form>

              {/* signin button */}
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                <span className="text-sm text-gray-400">
                  Already have an account?
                </span>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/signin";
                  }}
                  className="text-sm font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;