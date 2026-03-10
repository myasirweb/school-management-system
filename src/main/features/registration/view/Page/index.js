import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setRole,
  setCommonData,
  setRoleData,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  resetRegistration,
} from "../../store/registrationSlice";
import { registerUser } from "../../services/registrationService";
import StepIndicator from "./StepIndicator";
import RoleSelection from "./RoleSelection";
import RegistrationForm from "./RegistrationForm";
import ReviewSubmit from "./ReviewSubmit";
import schoolLogo from "../../../../../assets/images/main-logo/workwise.png";
import "../../style/registration.css";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentStep,
    selectedRole,
    commonData,
    roleData,
    loading,
    error,
    success,
  } = useSelector((state) => state.registration);

  // Reset form when component mounts
  useEffect(() => {
    dispatch(resetRegistration());
  }, [dispatch]);

  // Redirect to login after successful registration
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetRegistration());
        navigate("/login", { replace: true });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  const handleSelectRole = (role) => {
    dispatch(setRole(role));
  };

  const handleCommonChange = (data) => {
    dispatch(setCommonData(data));
  };

  const handleRoleChange = (data) => {
    dispatch(setRoleData(data));
  };

  const handleBackToRole = () => {
    dispatch(setStep(1));
  };

  const handleGoToReview = () => {
    dispatch(setStep(3));
  };

  const handleBackToForm = () => {
    dispatch(setStep(2));
  };

  const handleSubmit = () => {
    dispatch(registrationStart());

    const formData = {
      role: selectedRole,
      fullName: commonData.fullName,
      email: commonData.email,
      phone: commonData.phone,
      password: commonData.password,
      profilePhoto: commonData.profilePhoto,
      roleSpecificData: roleData,
    };

    const result = registerUser(formData);

    if (result.success) {
      dispatch(registrationSuccess());
    } else {
      dispatch(registrationFailure(result.error));
    }
  };

  return (
    <div className="register-page">
      <div className={`register-card ${currentStep === 2 ? "wide" : ""}`}>
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <img src={schoolLogo} alt="School Logo" className="h-10 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">Create Account</h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Content */}
        {currentStep === 1 && (
          <RoleSelection
            selectedRole={selectedRole}
            onSelectRole={handleSelectRole}
          />
        )}

        {currentStep === 2 && (
          <RegistrationForm
            selectedRole={selectedRole}
            commonData={commonData}
            roleData={roleData}
            onCommonChange={handleCommonChange}
            onRoleChange={handleRoleChange}
            onBack={handleBackToRole}
            onNext={handleGoToReview}
          />
        )}

        {currentStep === 3 && (
          <ReviewSubmit
            selectedRole={selectedRole}
            commonData={commonData}
            roleData={roleData}
            loading={loading}
            success={success}
            
            error={error}
            onBack={handleBackToForm}
            onSubmit={handleSubmit}
          />
        )}

        {/* Login Link */}
        {!success && (
          <div className="text-center mt-5 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-sm font-medium hover:underline transition"
              style={{ color: "var(--RoyalBlue)" }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
