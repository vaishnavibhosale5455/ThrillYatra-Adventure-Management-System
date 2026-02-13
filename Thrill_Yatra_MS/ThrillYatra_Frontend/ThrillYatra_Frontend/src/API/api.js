import { springApi, adventureApi,mailApi, reviewApi } from "./httpClient";

export const loginUser = (data) => springApi.post("/login", data);

export const registerUser = (data) => springApi.post("/user/registerUser", data);


//  Adventure microservice API's
export const getAllCategories = () => adventureApi.get("/admin/getAllCategories");

export const addCategory = (data) => adventureApi.post("/admin/addCategory", data);

export const addAdventure = (data) =>
  adventureApi.post("/admin/addAdventure", data);

export const getAllAdventures = () =>
  adventureApi.get("/admin/getAllAdventures");

// Mail Microservice API's
export const forgotPassword = (email) =>
  mailApi.post(`/auth/forgot-password?email=${email}`);

export const resetPassword = (email, newPassword) =>
  mailApi.post(
    `/auth/reset-password?email=${email}&newPassword=${newPassword}`
  );

// Review Microservice API's
export const addReview = (data) =>
  reviewApi.post("/user/addReview", data);

export const getAllReviews = () =>
  reviewApi.get("/user/getAllReviews");


export const getAdventuresByCategory = (categoryId) =>
  springApi.get(`/user/getAdventuresByCategory/${categoryId}`);

export const getUserBookings = (userId) =>
  springApi.get(`/user/getBookingsByUserId/${userId}`);

export const cancelBooking = (bookingId) =>
  springApi.put(`/user/cancelBooking/${bookingId}`);

export const processPayment = (data) => springApi.post("/payments", data);

export const bookAdventure = (data) =>
  springApi.post("/user/bookAdventure", data);

export const makePayment = (data) =>
  springApi.post("/user/makePayment", data);



export const getAllPaidPayments = () =>
  springApi.get("/getAllPaidPayments");

export const getAllBookings = () =>
  springApi.get("/user/getAllBookings");



