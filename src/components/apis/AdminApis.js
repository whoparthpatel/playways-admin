import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_baseUrl;

console.log(API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const adminApis = {
  // Admin Login & Logout
  login: (email, password) => axiosInstance.post('/admin/login', {email, password}),
  logout: (adminId) => axiosInstance.post('/admin/logout', {adminId}),

  // Users
  fetchUsers: () => axiosInstance.get('/users/allUsers'),
  addUser: (userData) => axiosInstance.post('/users/register', userData),
  updateUser: (editedUserId, userData) => axiosInstance.put(`/users/update/${editedUserId}`, userData),
  deleteUser: (id) => axiosInstance.delete(`/users/delete/${id}`),
  
  // Quotes
  fetchQuotes: () => axiosInstance.get('/quotes/getQuotes'),
  addQuote: (newQuote) => axiosInstance.post('/quotes/add', newQuote),
  deleteQuote: (id) => axiosInstance.delete(`/quotes/delete/${id}`),
  updateQuote: (selectedQuoteId, newQuote) => axiosInstance.put(`/quotes/update/${selectedQuoteId}`, newQuote),

  // Games
  fetchGames: () => axiosInstance.get('/games/all'),
  addGame: (formdata) => axiosInstance.post('/games/addGame', formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }),
  updateGames: (id, updateData) => axiosInstance.put(`/games/update/${id}`, updateData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }),
  deleteGame: (id) => axiosInstance.delete(`/games/delete/${id}`),

  // Hosts
  fetchHosts: () => axiosInstance.get(`/hosts/getHosts`),
  deleteHost: (id) => axiosInstance.delete(`/hosts/delete/${id}`),
  
  // GameStations
  fetchGameStations: () => axiosInstance.get('/gameStation/allStations'),
  addGameStations: (stationData) => axiosInstance.post('/gameStation/addGameStation', stationData),
  updateStatus: (id, status) => axiosInstance.put(`/gameStation/updateGameStation/${id}`, status),
  updateGameStation: (stationData) => axiosInstance.put(`/gameStation/updateGameStation/${stationData._id}`, stationData),
  deleteGameStation: (id) => axiosInstance.delete(`/gameStation/gameStation/${id}`),
  getCountOfStationsById: (hostId) => axiosInstance.get(`/gameStation/${hostId}/stations`),
  getAllGsByHostId: (hostId) => axiosInstance.get(`/gameStation/getallstationbyhostId/${hostId}`),
  getGameStationData: (id) => axiosInstance.get(`/gameStation/${id}`),
  
  // Bookings
  fetchBookings: () => axiosInstance.get('/bookings/allBookings'),

  // Feedback
  getAllFeedback: () => axiosInstance.get(`/feedback/get`),

};

export default adminApis;