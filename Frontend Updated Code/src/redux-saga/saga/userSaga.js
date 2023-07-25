import { call, put, takeEvery, all } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import apis from "../../constants/apis";

function* userRegister(action) {
  const { userData } = action.payload;
  try {
    const res = yield call(() => apis.post(`users/signup`, userData));
    yield put({
      type: actionType.REGISTRATION_SUCCESS,
      payload: res.data,
      succMsg: "You have successfully Registered.",
    });
  } catch (err) {
    yield put({
      type: actionType.REGISTRATION_FAIL,
      errMsg: err.message,
    });
  }
}

function* userRegisterSaga() {
  yield takeEvery(actionType.REGISTRATION_REQUESTED, userRegister);
}

function* userLogin(action) {
  const { data } = action.payload;

  try {
    const res = yield call(() => apis.post(`users/signin`, data));
    yield put({
      type: actionType.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.LOGIN_FAILED,
      errMsg: err.message,
    });
  }
}

function* loginUserSaga() {
  yield takeEvery(actionType.LOGIN_REQUESTED, userLogin);
}

function* getUserData(action) {
  const { email } = action.payload;
  try {
    const res = yield call(() => apis.get(`users/finduser/${email}`));
    yield put({
      type: actionType.GET_USER_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_USER_DATA_FAIL,
      errMsg: err.message,
    });
  }
}

function* getUserDataSaga() {
  yield takeEvery(actionType.GET_USER_DATA_REQUESTED, getUserData);
}

function* updatePassword(action) {
  const { payload } = action;
  const { userData } = payload;

  try {
    const response = yield call(() =>
      apis.put(`/users/updateuser`, userData[0])
    );
    yield put({
      type: actionType.UPDATE_USER_SUCCESS,
      payload: "Your New Password Successfully Updated.!",
    });
  } catch (error) {
    yield put({
      type: actionType.UPDATE_USER_FAIL,
      loginErrorMsg: "Network Error.",
    });
  }
}

function* setPasswordSaga() {
  yield takeEvery(actionType.UPDATE_USER_REQUESTED, updatePassword);
}

function* sendOtp(action) {
  const { payload } = action;
  const { userData } = payload;

  try {
    const response = apis.post(`/users/getotp`, userData);
    yield put({
      type: actionType.SEND_OTP_SUCCESS,
      payload: "OTP Sent to your email Successfully.",
    });
  } catch (error) {
    yield put({
      type: actionType.SEND_OTP_FAIL,
      errMsg: error.message,
    });
  }
}

function* sendOtpSaga() {
  yield takeEvery(actionType.SEND_OTP_REQUESTED, sendOtp);
}

function* getAllUsersData(action) {
  const { jwtToken } = action.payload;

  try {
    const res = yield call(() =>
      apis.get(`/users/findall`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.GET_ALL_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_ALL_USERS_FAILED,
      errMsg: err.message,
    });
  }
}

function* getAllUsersDataSaga() {
  yield takeEvery(actionType.GET_ALL_USERS_REQUESTED, getAllUsersData);
}

function* sendQueryUser(action) {
  const { jwtToken, data } = action.payload;
  try {
    const res = yield call(() =>
      apis.post(`/users/contact`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.POST_QUERY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.POST_QUERY_FAILED,
      errMsg: err.message,
    });
  }
}

function* sendQueryUserSaga() {
  yield takeEvery(actionType.POST_QUERY_REQUESTED, sendQueryUser);
}

export default function* userSaga() {
  yield all([
    userRegisterSaga(),
    loginUserSaga(),
    getUserDataSaga(),
    setPasswordSaga(),
    sendOtpSaga(),
    getAllUsersDataSaga(),
    sendQueryUserSaga(),
  ]);
}
