import { fork } from "redux-saga/effects";
import userSaga from "./userSaga";
import policySaga from "./policySaga";
import announcementSaga from "./announcementSaga";
import userPolicySaga from "./userPolicySaga";
import testimonialSaga from "./testimonialSaga";
import adminSaga from "./adminSaga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(policySaga);
  yield fork(announcementSaga);
  yield fork(userPolicySaga);
  yield fork(testimonialSaga);
  yield fork(adminSaga);
}
