// src/page/ChangePassword.jsx
import { Input, Button, addToast } from "@heroui/react";
import { useState } from "react";
import { ChangePasswordSchema } from "../Schema/ChangePasswordSchema.js";
import { changePasswordApi } from "../Services/authServices";
import { useForm } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { negative } from "zod";

export default function ChangePassword({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });

  async function handleFormSubmission(formData) {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await changePasswordApi(
        formData.password,
        formData.newPassword
      );
      if (response && response.error) {
        setErrorMessage(response.error);
        setSuccessMessage("");
      } else if (response && response.message) {
        setSuccessMessage(response.message);
        setErrorMessage("");
        reset();
        localStorage.removeItem("token");
        // عند النجاح، استدعي دالة الإغلاق
        onClose(); 
        setTimeout(() => {
        },1000);
      } else {
        setSuccessMessage("Password changed successfully!");
        setErrorMessage("");
        reset();
        localStorage.removeItem("token");
        // عند النجاح، استدعي دالة الإغلاق
        setTimeout(()=>{
          negative("/login")

        },1000)
        onClose(); 
       
      }

    } 
    catch (error) {
      console.error("Change password failed:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSuccessMessage("");

     
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative container max-w-sm sm:max-w-md lg:max-w-lg px-3 py-2 my-2 mx-auto rounded-xl shadow-xl border-1 border-stone-200 backdrop-blur-md bg-white dark:bg-white">
      <button
        onClick={onClose} 
        className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <p className="text-xl font-bold mb-4 text-sky-950 dark:text-sky-400 text-center">Change your Password</p>
      <form onSubmit={handleSubmit(handleFormSubmission)} className="p-8">
        <div className="flex flex-col gap-6 text-black dark:text-white items-center w-full max-w-sm mx-auto">
          <Input
            isInvalid={Boolean(errors.password?.message)}
            errorMessage={errors.password?.message}
            variant="bordered"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            placeholder=""
            className="w-full"
            {...register("password")}
          />
          <Input
            isInvalid={Boolean(errors.newPassword?.message)}
            errorMessage={errors.newPassword?.message}
            variant="bordered"
            label="New Password"
            type="password"
            autoComplete="new-password"
            placeholder=""
            className="w-full"
            {...register("newPassword")}
          />
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          <div className="flex gap-6">
            <Button
              isLoading={isLoading}
              type="submit"
              color="default"
              variant="shadow"
              className="bg-sky-950 dark:bg-sky-400 mt-4 p-5 w-fit text-sky-400 dark:text-sky-950 cursor-pointer"
              isDisabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change"}
            </Button>
            <Button
              className="bg-sky-950 dark:bg-sky-400  mt-4 p-5 w-fit text-sky-400 dark:text-sky-950 cursor-pointer"
              onPress={onClose} 
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}












// import { Input, Button } from "@heroui/react";
// import { useState } from "react";
// import { ChangePasswordSchema } from "../Schema/ChangePasswordSchema.js";
// import { changePasswordApi } from "../Services/authServices";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import FeedPage from "./FeedPage.jsx";
// export default function ChangePassword() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   // متغير حالة للتحكم في ظهور النموذج. قيمته الأولية هي 'false' ليكون مخفياً في البداية
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const navigate = useNavigate();
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       password: "",
//       newPassword: "",
//     },
//     resolver: zodResolver(ChangePasswordSchema)
//   });

//   async function handleFormSubmission(formData) {
//     setIsLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");
//     try {
//       const response = await changePasswordApi(
//         formData.password,
//         formData.newPassword
//       );

//       if (response && response.error) {
//         setErrorMessage(response.error);
//         setSuccessMessage("");
//       } else if (response && response.message) {
//         setSuccessMessage(response.message);
//         setErrorMessage("");
//         reset();
//         localStorage.removeItem("token");
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         setSuccessMessage("Password changed successfully!");
//         setErrorMessage("");
//         reset();
//         localStorage.removeItem("token");
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Change password failed:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//       setSuccessMessage("");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // دالة لإخفاء النموذج وإزالة البلور
//   const handleCloseForm = () => {
//     setIsFormVisible(false);
//   };

//   return (
//     // الحاوية الرئيسية للصفحة
//     <div className="relative min-h-screen">

//       {/* 1. طبقة الخلفية: المحتوى الرئيسي للصفحة */}
//       {/* هنا نطبق تأثير البلور فقط عندما يكون النموذج مرئياً */}
//       <div className={`transition-all duration-500 ${isFormVisible ? "blur-md" : ""}`}>
//         <div className="py-10 flex items-center justify-center text-center">
//           {/* هذا الزر سيظهر النافذة المنبثقة */}
//           <Button
//             className="bg-amber-950 text-white p-5"
//             onPress={() => setIsFormVisible(true)}
//           >
//             Change Password
//           </Button>
//           {/* هنا يمكنك وضع محتوى صفحتك الرئيسية مثل FeedPage */}
//           {/* <FeedPage /> */}
//         </div>
//       </div>
      
//       {/* 2. طبقة النافذة المنبثقة (الـ Modal) */}
//       {/* هذه الطبقة تظهر فقط عندما تكون isFormVisible صحيحة */}
//       {isFormVisible && (
//         <div className="fixed inset-0 flex items-center justify-center z-10  bg-opacity-30">
//           {/* حاوية النافذة المنبثقة الفعلية */}
//           <div className="relative container max-w-sm sm:max-w-md lg:max-w-lg px-3 py-2 my-2 mx-auto rounded-xl shadow-xl border-1 border-stone-200 backdrop-blur-md bg-white dark:bg-gray-800">
//             {/* زر الإغلاق */}
//             <button
//               onClick={handleCloseForm}
//               className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             {/* محتوى النموذج */}
//             <p className="text-xl font-bold mb-4 text-amber-950">Change your Password</p>
//             <form onSubmit={handleSubmit(handleFormSubmission)} className="p-8">
//               <div className="flex flex-col gap-6 text-black dark:text-white items-center w-full max-w-sm mx-auto">
//                 <Input
//                   isInvalid={Boolean(errors.password?.message)}
//                   errorMessage={errors.password?.message}
//                   variant="bordered"
//                   label="Current Password"
//                   type="password"
//                   autoComplete="current-password"
//                   placeholder=""
//                   className="w-full"
//                   {...register("password")}
//                 />
//                 <Input
//                   isInvalid={Boolean(errors.newPassword?.message)}
//                   errorMessage={errors.newPassword?.message}
//                   variant="bordered"
//                   label="New Password"
//                   type="password"
//                   autoComplete="new-password"
//                   placeholder=""
//                   className="w-full"
//                   {...register("newPassword")}
//                 />
//                 {errorMessage && (
//                   <p className="text-red-500 text-center">{errorMessage}</p>
//                 )}
//                 {successMessage && (
//                   <p className="text-green-500 text-center">{successMessage}</p>
//                 )}
//                 <div className="flex gap-6">
//                   <Button
//                     isLoading={isLoading}
//                     type="submit"
//                     color="default"
//                     variant="shadow"
//                     className="bg-amber-950 mt-4 p-5 w-fit text-white cursor-pointer"
//                     isDisabled={isLoading}
//                   >
//                     {isLoading ? "Changing..." : "Change"}
//                   </Button>
//                   <Button
//                     className="bg-amber-950 mt-4 p-5 w-fit text-white cursor-pointer"
//                     onPress={handleCloseForm}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import { Input, Button } from "@heroui/react";
// import { useState } from "react";
// import { ChangePasswordSchema } from "../Schema/ChangePasswordSchema.js";
// import { changePasswordApi } from "../Services/authServices";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import React from "react";
// import FeedPage from "./FeedPage.jsx";
// import { zodResolver } from "@hookform/resolvers/zod";

// export default function ChangePassword() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   // 1. متغير حالة جديد للتحكم في ظهور النموذج
//   const [isFormVisible, setIsFormVisible] = useState(true);

//   // const { setIsBlurred } = useAppBlur();
//   // const handleClose = () => {
//   //   navigate('/'); 
//   // };


//   // // هذه الدالة الآن تقوم بإخفاء النموذج أيضاً
//   // const handleCloseForm = () => {
//   //   // setIsBlurred(false); // إزالة التعتيم
//   //   setIsFormVisible(false); // 2. إخفاء النموذج
//   // };
//   const navigate = useNavigate();
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       password: "",
//       newPassword: "",
//     },
//     resolver:zodResolver(ChangePasswordSchema)
//   });

//   async function handleFormSubmission(formData) {
//     setIsLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const response = await changePasswordApi(
//         formData.password,
//         formData.newPassword
//       );

//       if (response && response.error) {
//         setErrorMessage(response.error);
//         setSuccessMessage("");
//       } else if (response && response.message) {
//         setSuccessMessage(response.message);
//         setErrorMessage("");
//         reset();
//         localStorage.removeItem("token");

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         setSuccessMessage("Password changed successfully!");
//         setErrorMessage("");
//         reset();
//         localStorage.removeItem("token");

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Change password failed:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//       setSuccessMessage("");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="relative py-10 min-h-screen flex items-center justify-center text-center">

//       {/* خلفية الصفحة التي ستحصل على تأثير التعتيم */}
//       <div
//         className={`absolute inset-0 z-0 transition-all duration-500 ${
//           isFormVisible ? "blur-md" : ""
//         }`}
//       >
//         <div className="min-h-screen w-full">


//           <div className="p-8 text-2xl text-white"></div>

        
//           {/* هذا الزر يجب أن يقوم بإظهار النموذج وليس مجرد عرض له */}
//           <Button className="bg-amber-950 text-white p-5" onPress={() => setIsFormVisible(true)}>
//             {/* <FeedPage/> */}
//             ChangePassword
//           </Button>
//         </div>
//       </div>
      
      
//       {/* 3. عرض النموذج فقط إذا كانت قيمة isFormVisible هي true */}
//       {isFormVisible && (
//         <div className="fixed inset-0 flex  items-center justify-center  z-10">
//           <div className="relative container max-w-sm sm:max-w-md lg:max-w-lg px-3 py-2 my-2 mx-auto rounded-xl shadow-xl border-1 border-stone-200 backdrop-blur-md bg-white dark:bg-gray-800">
            
//        <button
//           // onClick={handleClose}
//           className="absolute cursor-pointer  top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//             <p className="text-xl font-bold mb-4 text-amber-950">Change your Password</p>
//             <form onSubmit={handleSubmit(handleFormSubmission)} className="p-8">
//               <div className="flex flex-col gap-6 text-black dark:text-white items-center w-full max-w-sm mx-auto">
//                 <Input
//                   isInvalid={Boolean(errors.password?.message)}
//                   errorMessage={errors.password?.message}
//                   variant="bordered"
//                   label="Current Password"
//                   type="password"
//                   autoComplete="current-password"
//                   placeholder=""
//                   className="w-full"
//                   {...register("password")}
//                 />
//                 <Input
//                   isInvalid={Boolean(errors.newPassword?.message)}
//                   errorMessage={errors.newPassword?.message}
//                   variant="bordered"
//                   label="New Password"
//                   type="password"
//                   autoComplete="new-password"
//                   placeholder=""
//                   className="w-full"
//                   {...register("newPassword")}
//                 />
//                 {errorMessage && (
//                   <p className="text-red-500 text-center">{errorMessage}</p>
//                 )}
//                 {successMessage && (
//                   <p className="text-green-500 text-center">{successMessage}</p>
//                 )}


//                 <div className="flex gap-6">

//                      <Button
//                   isLoading={isLoading}
//                   type="submit"
//                   color="default"
//                   variant="shadow"
//                   className="bg-amber-950 mt-4 p-5 w-fit text-white cursor-pointer"
//                   isDisabled={isLoading}
//                 >
//                   {isLoading ? "Changing..." : "Change"}
//                 </Button>
//                 <Button
//                   className="bg-amber-950 mt-4 p-5 w-fit text-white cursor-pointer"
//                   // onPress={handleCloseForm}
//                 >
//                   Cancel
//                 </Button>
//                 </div>
                
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


