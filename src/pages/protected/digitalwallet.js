import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Digitalwallet from "../../features/digitalwallet";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "digitalwallet" }));
  }, []);

  return <Digitalwallet />;
}

export default InternalPage;
