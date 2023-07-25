import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Typography, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as actionType from "../redux-saga/actions";
import { connect } from "react-redux";

const UserList = (props) => {
  const { actions, userData, userDataLoading, userDataErr } = props;
  const [rows, setRows] = useState([]);
  const jwtToken = localStorage.getItem("token");
  const handleDelete = (id) => {
    //setUserList((prevUserList) => prevUserList.filter((user) => user.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    { field: "name", headerName: "Name", width: 150, flex: 1 },
    { field: "email", headerName: "Email", width: 350, flex: 1.5 },
    { field: "phone", headerName: "Contact No.", width: 100, flex: 1 },
    { field: "dob", headerName: "DOB", width: 100, flex: 1 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 180,
    //   sortable: false,

    //   renderCell: (params) => {
    //     return (
    //       <Button color="error" onClick={() => handleDelete(params.row.id)}>
    //         <DeleteForeverIcon></DeleteForeverIcon>
    //       </Button>
    //     );
    //   },
    //},
  ];

  useEffect(() => {
    actions.getAllUsers({ jwtToken });
  }, []);

  useEffect(() => {
    if (userData) {
      let row = userData.map((item, index) => {
        item.id = index + 1;
        item.name = item.firstname + " " + item.lastname;
        return item;
      });
      setRows(row);
    } else {
      setRows([]);
    }
  }, [userDataLoading]);

  useEffect(() => {
    console.log("User Details ARE =", userData);
  });

  const [pageSize, setPageSize] = useState(10);

  return (
    <Box className="container" sx={{ margin: 2 }}>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography align="center" variant="h5">
          Users List
        </Typography>
      </Box>

      <Card variant="outlined" className="pad-16 mt-8">
        <DataGrid
          loading={userDataLoading}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 10, 15]}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          // initialState={{
          //   ...userList.initialState,
          //   pagination: { paginationModel: { pageSize: 5 } },
          // }}
          pageSizeOptions={[5, 10, 25]}
          pagination
          autoHeight
        />
      </Card>
    </Box>
  );
};

const mapStateToProps = ({ reducerUser }) => {
  return {
    userData: reducerUser.allUsersData,
    userDataLoading: reducerUser.allUsersLoading,
    userDataErr: reducerUser.allUsersErr,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getAllUsers: (payload) => {
      dispatch(actionType.getAllUsers(payload));
    },
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
