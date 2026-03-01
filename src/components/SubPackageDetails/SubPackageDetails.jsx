import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchSubPackageDetails,
  clearCurrentDetails,
} from "../../redux/slices/subPackagesSlice";

import Banner from "./Banner";
import Description from "./Description";
import RelatedSubPackages from "./RelatedPackages";
import Loading from "./Loading";
import Error from "./Error";

const SubPackageDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subPackageId, packageSlug, subSlug } = useParams();

  const { currentDetails, detailsStatus, error } = useSelector(
    (state) => state.subPackages,
  );

  useEffect(() => {
    // fetch based on which URL pattern was matched
    if (subPackageId) {
      dispatch(fetchSubPackageDetails(subPackageId));
    } else if (packageSlug && subSlug) {
      dispatch(fetchSubPackageDetails(`${packageSlug}/${subSlug}`));
    }

    // clear stale data when user navigates away from this page
    return () => {
      dispatch(clearCurrentDetails());
    };
  }, [dispatch, subPackageId, packageSlug, subSlug]);

  if (detailsStatus === "loading") return <Loading />;
  if (detailsStatus === "failed") return <Error message={error} />;
  if (!currentDetails) return <Error message="Sub-package not found" />;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Banner subPackage={currentDetails} />
      <Description subPackage={currentDetails} />
      <RelatedSubPackages
        subPackages={currentDetails.relatedSubPackages}
        currentPackageSlug={packageSlug}
        currentSubSlug={subSlug}
        onNavigate={(url) => navigate(url)}
      />
    </div>
  );
};

export default SubPackageDetails;
