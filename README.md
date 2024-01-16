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

![login](./client/public/images/fixit.gif)

### Screenshots

**SignIn**
![login](https://github.com/shimna-puthanayil/fix-it/assets/132061805/d326bc45-3734-4f33-8a79-29a6b10474d3)

**Signup**
![signup](https://github.com/shimna-puthanayil/fix-it/assets/132061805/49f493f8-55d7-4ba4-881a-0ee5416bf210)

### Tenant

**Profile**
![t1](https://github.com/shimna-puthanayil/fix-it/assets/132061805/42eadd92-4a0a-4ef8-94fc-e5ee566592fa)

**Add Complaint**
![t2](https://github.com/shimna-puthanayil/fix-it/assets/132061805/6c617c2f-25ea-43e8-976d-4cbfdded275c)

**Update Complaint**
![t3](https://github.com/shimna-puthanayil/fix-it/assets/132061805/aba59985-3da8-4599-8131-fc23c7639d08)

### Agent

**Profile**
![Screen Shot 2024-01-16 at 12 54 23 am](https://github.com/shimna-puthanayil/fix-it/assets/132061805/60548487-defa-41de-8bf1-9c55bc6fe9d6)

**In Progress**
![a2](https://github.com/shimna-puthanayil/fix-it/assets/132061805/014e90ee-6486-4146-81cb-739f80fc1cc8)

**Complaint Details**
![a3](https://github.com/shimna-puthanayil/fix-it/assets/132061805/b07a2e84-645b-4ac5-9d72-8f101a6f6b52)
![a4](https://github.com/shimna-puthanayil/fix-it/assets/132061805/af84ce71-8c14-4f8e-8d9b-43ba6e21c7f4)

### Owner

**Profile**
![o1](https://github.com/shimna-puthanayil/fix-it/assets/132061805/f19ff7fb-19cc-41df-b108-6a1566f84a74)

**Resolved**
![o2](https://github.com/shimna-puthanayil/fix-it/assets/132061805/36283b74-7e40-447a-b25d-0a9c92094632)

**Approve Complaint**
![o3](https://github.com/shimna-puthanayil/fix-it/assets/132061805/d0a7217b-f1d6-47d3-97af-d3e85eb4e108)

### Admin

**Properties**
![admin1](https://github.com/shimna-puthanayil/fix-it/assets/132061805/74799810-9308-4207-b8a3-077858fb5ca6)

**Add property**
![admin2](https://github.com/shimna-puthanayil/fix-it/assets/132061805/5b3dc632-b913-4683-aa61-e6e4464cbeaa)

**Update property**
![Screen Shot 2024-01-16 at 1 04 43 am](https://github.com/shimna-puthanayil/fix-it/assets/132061805/ca0aa271-b1ad-4318-9cec-bb2ed9fae214)

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
