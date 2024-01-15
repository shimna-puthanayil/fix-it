# Fix It

## Description

This is a single page MERN application built for rental agents, owners and tenants to effectively manage the property maintenance tasks. This simple solution helps tenants to manage their complaints and get updated on the progress. The application also helps both property agents and owners to track the issues. The following are core functionalities of the application.

## Features

- **Easy Registration:** The users can create an account, login and manage different tasks based on their role(tenant, agent and owner)
- **Efficient way to raise mainatance issues:** The tenants can raise and update maintenance issues and can see the progress of them.
- **Easy tracking of maintance task progress:** Agents can change the status of complaints(open, In progress and resolved) and others (Owners and tenants) can view the current status of the property maintenance issues.
- **Management of maintence work quote:** When the new complaints(status-open) are raised the agents can add quotes of different businesses for approval. The owners can view and choose one of the quotes and can approve it.
- **View Properties:** The agents can view the property details that they manage and the owners can view the properties that they own.
- **Admin login:** The admin can view, add and update property details.

## Installation

- Install Node.js v16
- Clone the Repository from GitHub and navigate to the root directory
- Install necessary dependencies running the following command :

  ```
  npm i
  ```

  ```
  npm run seed
  ```

  Create a .env file in the root directory and add the environment variable to hold your secret key for authentication

  ```
  SECRET="YOUR SECRET KEY"
  ```

### Deployment Link :

https://rentals-fix-it-015339fa2e18.herokuapp.com/

# Usage

The application can be invoked in the terminal by using the following command:

```
npm run develop
```

Create accounts for owner, agent and tenant by selecting corresponding roles while sign up and then tenant can login and raise a complaint .The tenants can view their complaints (status- open and in progress) in their dashboard when they login. On clicking on a particular complaint a form will be displayed where they can update it. Agents can view the open complaints in the dashboard when they sign in .They can also see the complaints according to status. When a new complaint is raised , they can change status and add quotes of different business for approval by owner. Owners can view and choose one of the quotes and approve it . These functionalities are done in a form which can be accessed by clicking on a particular complaint from dashboard.

### Screenshots

**SignIn**
**Signup**

### Tenant

**Profile**
**Add Complaint**
**Update Complaint**

### Agent

**Profile**
**In Progress**
**Complaint Details**

### Owner

**Profile**
**Resolved**
**Approve Complaint**

### Admin

**Properties**
**Add property**

## Technologies, Tools And Database

- React JS
- Material UI
- Node
- Express
- Vite
- JavaScript
- Apolllo GraphQL
- MongoDB
- JWT for authentication

## Credits

#### References

https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=templates-store

https://mui.com/x/react-data-grid/

https://mui.com/x/react-data-grid/editing/
