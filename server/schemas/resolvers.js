const { User, Complaint, Property } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
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
        const props = await Property.find({ agent: agentId })
          .populate("owner")
          .populate("tenant");

        return props;
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    propertiesByOwner: async (parent, { ownerId }) => {
      try {
        return await Property.find({ owner: ownerId })
          .populate("agent")
          .populate("tenant");
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },
    complaintsRaisedToAgent: async (parent, args, context) => {
      try {
        const params = {};

        console.log(context.user.role);
        console.log(" id" + context.user._id);
        // if(context.user?.role)
        const propertyIds = [];
        let properties = [];
        switch (context.user.role) {
          case "owner":
            properties = await Property.find({ owner: context.user._id });
            break;
          case "agent":
            properties = await Property.find({ agent: context.user._id });
            break;
          case "tenant":
            properties = await Property.find({ tenant: context.user._id });
            break;
          default:
            break;
        }
        // const properties = await Property.find({ agent: context.user._id });
        properties.map((x) => propertyIds.push(x._id));
        params.propertyIds = propertyIds;

        const comp = await Complaint.find({
          property: { $in: propertyIds },
        }).populate("property");
        console.log("complaints");
        console.log(comp);
        return comp;
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
    addProperty: async (parent, { propertyDetails }) => {
      try {
        return Property.create(propertyDetails);
      } catch (error) {
        console.log("Could not add property!", error);
      }
    },
    addComplaint: async (parent, { complaint, property }) => {
      try {
        return Complaint.create({ complaint, property });
      } catch (error) {
        console.log("Could not raise complaint", error);
      }
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("SignUp failed", error);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
          throw AuthenticationError;
        }
        const token = signToken(user);
        console.log(token);
        return { token, user };
      } catch (error) {
        console.log("Login failed", error);
      }
    },
  },
};
module.exports = resolvers;
