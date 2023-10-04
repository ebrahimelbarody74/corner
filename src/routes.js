import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { GiLevelEndFlag } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import { AiFillDashboard } from "react-icons/ai";
import { FcDepartment } from "react-icons/fc";
import { FaRegKeyboard } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Users from "pages/Users";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: (
      <Icon as={AiFillDashboard} width="20px" height="20px" color="inherit" />
    ),
    component: MainDashboard,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Users,
  },
  {
    name: "New Map",
    layout: "/admin",
    path: "/new-map",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    secondary: true,
  },

  {
    name: "Buildings",
    layout: "/admin",
    path: "/buildings-list",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Levels",
    layout: "/admin",
    path: "/levels",
    icon: (
      <Icon as={GiLevelEndFlag} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Department",
    layout: "/admin",
    path: "/department",
    icon: (
      <Icon as={FaRegKeyboard} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    secondary: true,
  },

  {
    name: "Rooms",
    layout: "/admin",
    path: "/rooms",
    icon: (
      <Icon as={SiGoogleclassroom} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Items",
    layout: "/admin",
    path: "/items",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
];

export default routes;
