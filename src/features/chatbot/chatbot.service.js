import axios from "../../services/axiosInstance";
import { API } from "../../config/api";

export const sendChatLead = async (payload) => {
  await axios.post(API.chatbot.sendLead, payload);
};