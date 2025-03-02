import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Confirmation from "../../features/documents/components/confirmation";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "confirmation" }));
  }, []);

  return <Confirmation />;
}

export default InternalPage;
