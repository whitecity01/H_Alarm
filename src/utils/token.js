// import Cookies from "js-cookie";
import { json } from "react-router-dom";
import { userToken } from "store/auth";

/**
 * 인증 토큰 데이터를 반환한다.
 * @returns {object} accessToken 및 setAccessToken
 */
const getAuthToken = () => {
  return userToken((state)=> state.accessTokenExpiration) < Date.now() 
  ? 
    userToken((state)=> state.refreshtokenExpiration) < Date.now() 
    ?
      null 
      : 
      userToken((state)=> state.refreshToken ) 
    : 
    userToken((state)=>state.accessToken);

};

const getAuthTokenAtGlobal = () => {
  return userToken.getState().accessTokenExpiration < Date.now()
  ?
    userToken.getState().refreshTokenExpiration < Date.now()
    ?
      ""
      :
      userToken.getState().refreshToken
    :
    userToken.getState().accessToken;
}

/**
 * refreshToken 저장
 * @param {string} refreshtoken
 */
const setRefreshToken = (refreshToken, expiredTime) => {
  userToken((state)=>state.setRefreshTokend)(refreshToken)
  userToken((state)=>state.setRefreshTokenExpiration)(expiredTime);
  // Cookies.set("refreshToken", refreshToken, {
  //   expires: new Date(expiredTime),
  // });
};

const setRefreshTokenAtGlobal = (refreshToken, expiredTime) => {
  userToken.getState().setRefreshToken(refreshToken);
  userToken.getState().setRefreshTokenExpiration(expiredTime);
}

const setAccessToken = (accessToken, expiredTime) => {
  userToken((state)=>state.setAccessToken)(accessToken)
  userToken((state)=>state.setAccessTokenExpiration)(expiredTime);
};

const setAccessTokenAtGlobal = (accessToken, expiredTime) => {
  userToken.getState().setAccessToken(accessToken);
  userToken.getState().setAccessTokenExpiration(expiredTime);
}
/**
 * refreshToken 반환
 * @returns {string} refreshToken
 */
// const getRefreshToken = () => {
//   return Cookies.get("refreshToken");
// };

/**
 * 토큰이 없는 경우 로그인 페이지로 이동시키기 위한 Loader
 * @returns 로그인페이지로 이동
 */
const restrictAccessWithNoToken = async () => {
  const { accessToken } = getAuthToken();

  if (!accessToken) {
    throw json({ message: "잘못된 접근입니다." }, { status: 404 });
  }

  return null;
};

export {
  getAuthToken,
  setRefreshToken,
  setRefreshTokenAtGlobal,
  setAccessToken,
  setAccessTokenAtGlobal,
  restrictAccessWithNoToken,
  getAuthTokenAtGlobal
};
