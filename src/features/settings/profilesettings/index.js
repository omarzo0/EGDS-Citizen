import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { Link } from "react-router-dom";

function ProfileSettings() {
  const dispatch = useDispatch();

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard topMargin="mt-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <Link
            to="/app/settings-billing"
            className="text-purple-900 underline hover:text-purple-700 transition"
          >
            Bills
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <InputText
            labelTitle="First Name"
            defaultValue="omar"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Last Name"
            defaultValue="abdelhamid"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="National Id"
            defaultValue="30312030400298"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Phone Number"
            defaultValue="+201002020455"
            type="tel"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Password"
            defaultValue="UI/UX Designer"
            type="password"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Confirm Password"
            defaultValue="UI/UX Designer"
            type="password"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Place"
            defaultValue="California"
            updateFormValue={updateFormValue}
          />
        </div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
