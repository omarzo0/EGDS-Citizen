/** Icons are imported separatly to reduce build time */
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/transactions", // url
    icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
    name: "Transactions", // name that appear in Sidebar
  },
  {
    path: "/app/charts", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Analytics", // name that appear in Sidebar
  },
  {
    path: "/app/settings-profile", //url
    icon: <UserIcon className={submenuIconClasses} />, // icon component
    name: "Profile", // name that appear in Sidebar
  },
  {
    path: "/app/settings-billing",
    icon: <WalletIcon className={submenuIconClasses} />,
    name: "Billing",
  },
];

export default routes;
