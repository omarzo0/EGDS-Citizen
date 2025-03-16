import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Payment from "../../features/documents/components/payment/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "payment" }));
  }, []);

  return <Payment />;
}

export default InternalPage;
