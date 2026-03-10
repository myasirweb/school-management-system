import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  selectedRole: null,
  commonData: {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  },
  roleData: {},
  loading: false,
  error: null,
  success: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setRole: (state, action) => {
      state.selectedRole = action.payload;
      state.roleData = {};
      state.currentStep = 2;
    },
    setCommonData: (state, action) => {
      state.commonData = { ...state.commonData, ...action.payload };
    },
    setRoleData: (state, action) => {
      state.roleData = { ...state.roleData, ...action.payload };
    },
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetRegistration: () => initialState,
  },
});

export const {
  setStep,
  setRole,
  setCommonData,
  setRoleData,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
