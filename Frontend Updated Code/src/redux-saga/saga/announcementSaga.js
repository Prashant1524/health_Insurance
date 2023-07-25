import { call, put, takeEvery, all } from "redux-saga/effects";
import apis from "../../constants/apis";
import * as actionType from "../actions/actionTypes";
import axios from "axios";

function* getAllAnnouncement(action) {
  try {
    const res = yield call(() => apis.get(`/announcements/getallannou`));
    yield put({
      type: actionType.GET_ANNOUNCEMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.GET_ANNOUNCEMENT_FAIL,
      errMsg: error.message,
    });
  }
}

function* getAllAnnouncementSaga() {
  yield takeEvery(actionType.GET_ANNOUNCEMENT_REQUESTED, getAllAnnouncement);
}

function* addNewAnnouncement(action) {
  const { jwtToken, announceData } = action.payload;
  try {
    const res = yield call(() =>
      apis.post(`/announcements/admin/addAnn`, announceData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.ADD_ANNOUNCEMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.ADD_ANNOUNCEMENT_FAIL,
      errMsg: error.message,
    });
  }
}

function* addNewAnnouncementSaga() {
  yield takeEvery(actionType.ADD_ANNOUNCEMENT_REQUESTED, addNewAnnouncement);
}

function* getPositionAdmin(action) {
  const { jwtToken } = action.payload;
  try {
    const res = yield call(() => apis.get(`/position/getAllPosition`));
    yield put({
      type: actionType.GET_POSITION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.GET_POSITION_FAILED,
      errMsg: error.message,
    });
  }
}

function* getPositionSaga() {
  yield takeEvery(actionType.GET_POSITION_REQUESTED, getPositionAdmin);
}

function* updatePositionAdmin(action) {
  const { data, jwtToken } = action.payload;
  try {
    const res = yield call(() =>
      apis.put(`/position/updatePosition`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.ADD_POSITION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.ADD_POSITION_FAILED,
      errMsg: error.message,
    });
  }
}

function* updatePositionAdminSaga() {
  yield takeEvery(actionType.ADD_POSITION_REQUESTED, updatePositionAdmin);
}

export default function* announcementSaga() {
  yield all([
    getAllAnnouncementSaga(),
    addNewAnnouncementSaga(),
    getPositionSaga(),
    updatePositionAdminSaga(),
  ]);
}
