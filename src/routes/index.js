// All components mapping with path for internal routes

import { lazy } from "react";

const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const Profile = lazy(() => import("../pages/protected/profile"));
const Home = lazy(() => import("../pages/protected/home"));
const Providers = lazy(() => import("../pages/protected/providers"));
const Digitalwallet = lazy(() => import("../pages/protected/digitalwallet"));

const routes = [
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },

  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/provider",
    component: Providers,
  },
  {
    path: "/digitalwallet",
    component: Digitalwallet,
  },
];

export default routes;
