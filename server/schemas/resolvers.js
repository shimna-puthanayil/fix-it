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
        console.log("Could not find properties");
      }
    },
    complaintsRaisedToAgent: async (parent, agentId) => {
      try {
        return await Complaint.find({
          property: { $in: Property.find(agentId).select("_id") },
        });
      } catch (error) {
        console.log("Could not find complaints");
      }
    },
    complaintsOfPropertyByOwner: async (parent, ownerId) => {
      try {
        return await Complaint.find({
          property: { $in: Property.find(ownerId) },
        });
      } catch (error) {
        console.log("Could not find complaints");
      }
    },
    complaintsRaisedByTenant: async (parent, tenantId) => {
      try {
        return await Complaint.find({
          property: { $in: Property.find(tenantId) },
        });
      } catch {
        console.log("Could not find complaints");
      }
    },
  },
  Mutation: {},
};
