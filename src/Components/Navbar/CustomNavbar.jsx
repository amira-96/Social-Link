import React, { useContext, useEffect, useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/authcontex.jsx";
import { Link } from "react-router-dom";
import userphoto from "/src/assets/userphoto.jpg";
import { AppBlurContext } from "../../Context/AppBlurContext.jsx";
import ChangePassword from "../../page/ChangePassword.jsx";
import ProfilePage from "../../page/ProfilePage.jsx";
import DarckMood from "../DarckMood/DarckMood.jsx";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(authContext); 
  const { showModal, hideModal } = useContext(AppBlurContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // open change password
  const handleOpenChangePassword = () => {
    showModal(<ChangePassword onClose={hideModal} />);
    navigate("/login");
  };
  //open change photo
  const handelOpenChangeProfilePhoto = () => {
    showModal(<ProfilePage onClose={hideModal} />);
    navigate("/");
  };
// logout
  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/login");
  }

  return (
    <Navbar
      className="  text-sky-800 dark:text-stone-400"
      onMenuOpenChange={setIsMenuOpen} // تحديث حالة القائمة عند الفتح/الإغلاق
      isMenuOpen={isMenuOpen} // تمرير حالة القائمة
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden" // إخفاء الأيقونة في الشاشات الأكبر من sm
        />

        <NavbarItem>
          <div
            onClick={handelOpenChangeProfilePhoto}
            className="w-10 h-10 rounded-full cursor-pointer"
          >
            <img
              src={userData?.photo || userphoto}
              alt="User Profile"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
          </div>
        </NavbarItem>

        <NavbarBrand>
          <Link to={""} className="font-bold text-sky-950 dark:text-sky-500">
            Social&Link
          </Link>
        </NavbarBrand>
        <NavbarBrand className="hidden sm:flex justify-end">
          <div className=" flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className=" w-8 h-8"
            >
              <path
                className=" fill-sky-950  dark:fill-sky-500"
                d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"
              />
            </svg>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <>
            <Dropdown className="hidden sm:flex">
              <DropdownTrigger>
                <button
                  aria-label="Setting"
                  className="hidden sm:flex  bg-sky-950  rounded-full p-2 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-950"
                >
                  {/* أيقونة الإعدادات SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-6 h-6 fill-current text-sky-300  dark:text-sky-300"
                  >
                    <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                  </svg>
                </button>
              </DropdownTrigger>
              
              <DropdownMenu>
                
                <DropdownItem color="">
                  <div className="flex flex-col  justify-center items-center cursor-none">
                  <span className="text-sky-600">Settings</span>
                  <p className="text-sky-300">Manage your account</p>

                  </div>

                </DropdownItem>
                <DropdownItem
                
                className="bg-sky-50 p-3 border-0 shadow-2xl space-x-2 my-3 text-sky-600"
                  key="change-photo"
                  onPress={handelOpenChangeProfilePhoto}
                  color="primary"
                >
                  User Photo
                </DropdownItem>

                <DropdownItem
               className="bg-sky-50 p-3 border-0 shadow-2xl space-x-2 my-3 text-sky-600"

                  key="change-password"
                  onPress={handleOpenChangePassword}
                  color="primary"
                >
                  change Password
                </DropdownItem>


                 <DropdownItem
                  key="sign-out"
                  isLoggeding color="primary"
                className="bg-sky-50 p-3 text-center border-0 shadow-2xl space-x-2 text-sky-600 "
                  onPress={logOut}
                >
                  Sign Out
                </DropdownItem> 
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <NavbarItem className="flex">
              <Button color="default" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}

        <DarckMood />
      </NavbarContent>

      <NavbarMenu className=" cursor-pointer ">
        <NavbarMenuItem>
          <Link
            to={"/"}
            onClick={() => setIsMenuOpen(false)}
            className="font-bold text-sky-950 dark:text-sky-400"
          >
            Profile
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex">
          <Dropdown>
            <DropdownTrigger>
              <button className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {/* أيقونة الإعدادات SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 fill-current text-sky-950 dark:text-sky-600"
                >
                  <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                </svg>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="change-photo"
               className="text-sky-950 dark:text-sky-400"

                onPress={handelOpenChangeProfilePhoto}
              >
                User Photo
              </DropdownItem>

              <DropdownItem
                key="change-password"
                className="text-sky-950 dark:text-sky-400"
                onPress={handleOpenChangePassword}
              >
                change Password
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <p className="text-xl text-sky-950 dark:text-sky-400 ">Setting</p>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            onPress={logOut}
            color="default"
            className="bg-sky-950 text-sky-400 dark:text-sky-950 dark:bg-sky-400"
            variant="flat"
          >
            Sign Out
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
