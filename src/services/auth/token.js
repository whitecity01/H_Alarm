import axios from "axios";
import { SERVER_IP } from "../../constants/api";

const reissueToken = async (refreshToken) => {
  try {
    const res = await axios.get(`${SERVER_IP}/refresh-token`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization-Refresh": refreshToken,
      },
    });
    return res;
  } catch (e) {
    console.error("emergency : ", e);
  }
};

export { reissueToken };
