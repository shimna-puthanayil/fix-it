import gql from "@apollo/client";
export const QUERY_USER = gql`
  query UserS {
    users {
      username
      email
      role
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
export const QUERY_PROPERTIES_BY_AGENT = gql`
  query PropertiesByAgent($agentId: ID!) {
    propertiesByAgent(agentId: $agentId) {
      address
      owner {
        username
      }
      tenant {
        username
      }
    }
  }
`;
export const QUERY_PROPERTIES_BY_OWNER = gql`
  query PropertiesByOwner($ownerId: ID!) {
    propertiesByOwner(ownerId: $ownerId) {
      address
      agent {
        username
      }
      tenant {
        username
      }
    }
  }
`;
export const QUERY_COMPLAINTS_BY_TENANT = gql`
  query ComplaintsRaisedByTenant($tenantId: ID!) {
    complaintsRaisedByTenant(tenantId: $tenantId) {
      complaint
      property {
        address
      }
      date
    }
  }
`;
export const QUERY_COMPLAINTS_OF_PROPERTY_BY_OWNER = gql`
  query ComplaintsOfPropertyByOwner($ownerId: ID!) {
    complaintsOfPropertyByOwner(ownerId: $ownerId) {
      complaint
      property {
        address
      }
      date
    }
  }
`;
export const QUERY_COMPLAINTS_RAISED_TO_AGENT = gql`
  query ComplaintsRaisedToAgent($agentId: ID!) {
    complaintsRaisedToAgent(agentId: $agentId) {
      complaint
      property {
        address
      }
      date
    }
  }
`;
export const QUERY_ = gql``;
