import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import { useTranslation } from "react-i18next";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mb-2 sm:mb-0 w-full sm:w-auto"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs sm:btn-sm mr-0 sm:mr-2 btn-active btn-ghost normal-case flex items-center justify-center"
          style={{ minWidth: "auto" }}
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end w-full sm:w-auto">
        <label
          tabIndex={0}
          className="btn btn-sm btn-outline w-full sm:w-auto flex justify-center items-center"
        >
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-full sm:w-52 max-h-48 overflow-auto"
        >
          {locationFilters.map((l, k) => (
            <li key={k}>
              <a onClick={() => showFiltersAndApply(l)}>{l}</a>
            </li>
          ))}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Transactions() {
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);
  const { t } = useTranslation();

  const removeFilter = () => {
    setTrans(RECENT_TRANSACTIONS);
  };

  const applyFilter = (params) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter(
      (t) => t.location === params
    );
    setTrans(filteredTransactions);
  };

  // Search according to name or email
  const applySearch = (value) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title={t("Recent Transactions")}
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full rounded-md shadow-sm border border-gray-200">
          <table className="table w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm sm:text-base">
                <th className="whitespace-nowrap px-3 py-2">{t("Document Name")}</th>
                <th className="whitespace-nowrap px-3 py-2">{t("Transaction Id")}</th>
                <th className="whitespace-nowrap px-3 py-2">{t("city")}</th>
                <th className="whitespace-nowrap px-3 py-2">{t("Amount")}</th>
                <th className="whitespace-nowrap px-3 py-2">{t("Transaction Date")}</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => (
                <tr key={k} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold text-sm sm:text-base">{l.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">{l.email}</td>
                  <td className="whitespace-nowrap px-3 py-2">{l.location}</td>
                  <td className="whitespace-nowrap px-3 py-2">{l.amount} LE</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {moment(l.date).format("D MMM")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Transactions;
