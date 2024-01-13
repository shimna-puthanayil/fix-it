import { gql } from "@apollo/client";
export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      email
      role
      username
    }
  }
`;
export const QUERY_PROPERTY = gql`
  query Properties {
    properties {
      address
      agent {
        username
      }
      owner {
        username
      }
      tenant {
        username
      }
    }
  }
`;
export const QUERY_PROPERTIES_BY_USER = gql`
  query PropertiesByUser($role: String!) {
    propertiesByUser(role: $role) {
      _id
      address
      owner {
        _id
        username
      }
      agent {
        _id
        username
      }
      tenant {
        _id
        username
      }
    }
  }
`;
// export const QUERY_PROPERTIES_BY_OWNER = gql`
//   query PropertiesByOwner($ownerId: ID!) {
//     propertiesByOwner(ownerId: $ownerId) {
//       address
//       agent {
//         username
//       }
//       tenant {
//         username
//       }
//     }
//   }
// `;
// export const QUERY_COMPLAINTS_BY_TENANT = gql`
//   query ComplaintsRaisedByTenant($tenantId: ID!) {
//     complaintsRaisedByTenant(tenantId: $tenantId) {
//       complaint
//       property {
//         address
//       }
//       date
//     }
//   }
// `;
// export const QUERY_COMPLAINTS_OF_PROPERTY_BY_OWNER = gql`
//   query ComplaintsOfPropertyByOwner($ownerId: ID!) {
//     complaintsOfPropertyByOwner(ownerId: $ownerId) {
//       complaint
//       property {
//         address
//       }
//       date
//     }
//   }
// `;
export const QUERY_COMPLAINTS_RAISED = gql`
  query ComplaintsRaised {
    complaintsRaised {
      _id
      date
      complaint
      property {
        _id
        address
      }
      status
      quotes {
        address
        businessName
        quote
      }
      approvedQuote
    }
  }
`;
