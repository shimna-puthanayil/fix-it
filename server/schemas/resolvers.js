const { User, Complaint, Property } = require("../models");
const resolvers = {
  Query: {
    propertiesByAgent: async (parent, agentId) => {
      try {
        return await Property.find(agentId);
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    propertiesByOwner: async (parent, ownerId) => {
      try {
        return await Property.find(ownerId);
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    complaintsRaisedToAgent: async (parent, agentId) => {
      try {
        return await Complaint.find({
          property: { $in: Property.find(agentId).select("_id") },
        });
      } catch (error) {
        console.log("Could not find complaints", error);
      }
    },
    complaintsOfPropertyByOwner: async (parent, ownerId) => {
      try {
        return await Complaint.find({
          property: { $in: Property.find(ownerId) },
        });
      } catch (error) {
        console.log("Could not find complaints", error);
      }
    },
    complaintsRaisedByTenant: async (parent, tenantId) => {
      try {
        return await Complaint.find({
          property: { $in: Property.find(tenantId) },
        });
      } catch {
        console.log("Could not find complaints", error);
      }
    },
  },
  Mutation: {
    addProperty: async (parent, propertyDetails) => {
      try {
        return Property.create(propertyDetails);
      } catch (error) {
        console.log("Could not add property!", error);
      }
    },
    addComplaint: async (parent, { complaint, propertyId }) => {
      try {
        return Complaint.create({ complaint, propertyId });
      } catch (error) {
        console.log("Could not raise complaint", error);
      }
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        return { user };
      } catch (error) {
        console.log("SignUp failed", error);
      }
    },
    login: async ({ email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          //   throw AuthenticationError;
          console.log("Authentication failed", error);
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
          console.log("Authentication failed", error);
        }
        return { user };
      } catch (error) {
        console.log("Login failed", error);
      }
    },
  },
};
