import { call, put, takeEvery, all } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import apis from "../../constants/apis";

function* getAllTestimonial(action) {
  const { jwtToken } = action.payload;
  try {
    const res = yield call(() => apis.get(`/test/getall`));
    yield put({
      type: actionType.GET_REVIEW_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_REVIEW_FAILED,
      errMsg: err.message,
    });
  }
}

function* getAllTestimonialSaga() {
  yield takeEvery(actionType.GET_REVIEW_REQUESTED, getAllTestimonial);
}

function* addNewTestimonial(action) {
  const { review, jwtToken } = action.payload;
  try {
    const res = yield call(() =>
      apis.post(`/test/add`, review, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.ADD_REVIEW_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.ADD_REVIEW_FAILED,
      errMsg: error.message,
    });
  }
}

function* addNewTestimonialSaga() {
  yield takeEvery(actionType.ADD_REVIEW_REQUESTED, addNewTestimonial);
}

function* updateTestimonial(action) {
  const { data, jwtToken } = action.payload;

  try {
    const res = yield call(() =>
      apis.put(`/test/update`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );

    yield put({
      type: actionType.UPDATE_TESTIMONIAL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.UPDATE_TESTIMONIAL_FAILED,
      errMsg: err.message,
    });
  }
}

function* updateTestimonialSaga() {
  yield takeEvery(actionType.UPDATE_TESTIMONIAL_REQUESTED, updateTestimonial);
}

function* deleteTestimonialReview(action) {
  const { id, jwtToken } = action.payload;
  try {
    const res = yield call(() =>
      apis.delete(`/test/deletetestimonial/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.DELETE_TESTIMONIAL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.DELETE_TESTIMONIAL_FAILED,
      errMsg: err.message,
    });
  }
}

function* deleteTestimonialReviewSaga() {
  yield takeEvery(
    actionType.DELETE_TESTIMONIAL_REQUESTED,
    deleteTestimonialReview
  );
}
export default function* testimonialSaga() {
  yield all([
    getAllTestimonialSaga(),
    addNewTestimonialSaga(),
    updateTestimonialSaga(),
    deleteTestimonialReviewSaga(),
  ]);
}
