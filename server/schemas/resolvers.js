const { User, Complaint, Property } = require("../models");
const resolvers = {
  Query: {
    properties: async () => {
      try {
        const props = Property.find()
          .populate("agent")
          .populate("owner")
          .populate("tenant");

        return props;
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    propertiesByAgent: async (parent, { agentId }) => {
      try {
        const props = await Property.find({ agent: agentId }).select("-__v");
        return props;
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    propertiesByOwner: async (parent, { ownerId }) => {
      try {
        return await Property.find({ owner: ownerId });
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    complaintsRaisedToAgent: async (parent, { agentId }) => {
      try {
        const propertyIds = [];
        const properties = await Property.find({ agent: agentId });
        properties.map((x) => propertyIds.push(x._id));
        return await Complaint.find({
          property: { $in: propertyIds },
        }).populate("property");
      } catch (error) {
        console.log("Could not find complaints", error);
      }
    },
    complaintsOfPropertyByOwner: async (parent, { ownerId }) => {
      try {
        const propertyIds = [];
        const properties = await Property.find({ owner: ownerId });
        properties.map((x) => propertyIds.push(x._id));
        return await Complaint.find({
          property: { $in: propertyIds },
        }).populate("property");
      } catch (error) {
        console.log("Could not find complaints", error);
      }
    },
    complaintsRaisedByTenant: async (parent, { tenantId }) => {
      try {
        const propertyIds = [];
        const properties = await Property.find({ tenant: tenantId });
        properties.map((x) => propertyIds.push(x._id));
        return await Complaint.find({
          property: { $in: propertyIds },
        }).populate("property");
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
module.exports = resolvers;
