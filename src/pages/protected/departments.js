import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Departments from "../../features/documents/components/departments";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "departments" }));
  }, []);

  return <Departments />;
}

export default InternalPage;
