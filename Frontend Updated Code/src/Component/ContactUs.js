import "../styles/ContactUs.css";
import coverimage from "../images/contactImg.png";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { connect } from "react-redux";
import * as actionType from "../redux-saga/actions";
import jwt from "jwt-decode";

function ContactUs(props) {
  const { actions, postErr, postSucc, userData, loading } = props;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const jwtToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const userEmail = jwt(jwtToken).sub;

  const handleSubmit = () => {
    const el = document.getElementById("myForm");
    if (el) {
      el.addEventListener("submit", function (evt) {
        evt.preventDefault();
        console.log("User Query are:", firstname, lastname, email, query);
        const data = {
          user_id: {
            id: userData[0].id,
          },
          firstname: userData[0].firstname,
          lastname: userData[0].lastname,
          email: userData[0].email,
          query: query,
        };
        actions.postQuery({ data, jwtToken });
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    actions.resetQueryMsg();
    // setEmail("")
    // setFirstname("")
    // setLastname("")
    setQuery("");
  };
  useEffect(() => {
    if (postErr || postSucc) {
      setOpen(true);
    }
  }, [postErr, postSucc]);

  useEffect(() => {
    actions.getUserData({ email: userEmail });
  }, []);
  return (
    <div>
      <div class="split left">
        <div class="centered">
          <img src={coverimage} alt="health insurance cover image" />
        </div>
      </div>

      <div class="split right">
        <div>
          <form className="formcontactus" method="post" id="myForm">
            <h2 className="h2contactus">Contact Us</h2>
            <input
              className="inputcontactus"
              type="text"
              value={userData ? userData[0].firstname : firstname}
              placeholder="Enter First Name"
              // onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <br />
            <input
              className="inputcontactus"
              type="text"
              placeholder="Enter Last Name"
              // onChange={(e) => setLastname(e.target.value)}
              value={userData ? userData[0].lastname : lastname}
              required
            />
            <br />
            <input
              className="inputcontactus"
              type="email"
              placeholder="Enter User Email"
              value={userData ? userData[0].email : email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <textarea
              className="inputcontactus"
              placeholder="Enter your query"
              value={query}
              rows="5"
              cols="60"
              onChange={(e) => setQuery(e.target.value)}
              required
            ></textarea>
            <br />
            <Button
              className="formbutton"
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {postSucc ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your query successfully sent, We will review and contact you!
          </Alert>
        ) : postErr ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Error while adding your query! Please try again.
          </Alert>
        ) : null}
      </Snackbar>
    </div>
  );
}

const mapStateToProps = ({ reducerUser }) => {
  return {
    loading: reducerUser.sendQueryLoading,
    postSucc: reducerUser.sendQuerySucc,
    postErr: reducerUser.sendQueryErr,
    userData: reducerUser.userData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    postQuery: (payload) => {
      dispatch(actionType.postQuery(payload));
    },
    resetQueryMsg: () => {
      dispatch(actionType.resetQueryMsg());
    },
    getUserData: (payload) => {
      dispatch(actionType.getUserDetails(payload));
    },
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
