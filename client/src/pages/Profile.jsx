// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { QUERY_COMPLAINTS_RAISED_TO_AGENT } from "../../utils/queries";
// import { useQuery } from "@apollo/client";
// import { useEffect } from "react";
// const Profile = () => {
//   //   const { loading, data } = useQuery(QUERY_COMPLAINTS_RAISED_TO_AGENT);
//   const { loading, data } = useQuery(QUERY_COMPLAINTS_RAISED_TO_AGENT);
//   let complaintData = [];
//   if (data) {
//     complaintData = data.complaintsRaisedToAgent;
//     console.log(complaintData.length);
//     console.log(complaintData.rows);
//   }

//   //   if (data) console.log(data.complaintsRaisedToAgent);
//   //   return (
//   //     <div>
//   //       {loading ? <h2>LOADING...</h2> : null}
//   //       {complaintData.length > 0 ? (
//   //         <DataGrid
//   //           autoHeight
//   //           {...complaintData}
//   //           rows={complaintData.rows.slice(0, nbRows)}
//   //         />
//   //       ) : (
//   //         <h2>No Data...</h2>
//   //       )}
//   //     </div>
//   //   );
//   <div style={{ height: 400 }}>
//     <DataGridPremium
//       rowSelection={rowSelection}
//       checkboxSelection={rowSelection}
//       cellSelection
//       {...data}
//     />
//   </div>;
// };
// export default Profile;
