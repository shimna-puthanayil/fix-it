const { User, Complaint, Property } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    users: async () => {
      try {
        return User.find();
      } catch (error) {
        console.log("Could not find users", error);
      }
    },
    // properties: async () => {
    //   try {
    //     const properties = Property.find()
    //       .populate("agent")
    //       .populate("owner")
    //       .populate("tenant");

    //     return properties;
    //   } catch (error) {
    //     console.log("Could not find properties", error);
    //   }
    // },
    propertiesByUser: async (parent, { role }, context) => {
      try {
        if (role === "agent")
          return await Property.find({ agent: context.user._id })
            .sort({ _id: -1 })
            .populate("owner")
            .populate("agent")
            .populate("tenant");
        else if (role === "owner")
          return await Property.find({ owner: context.user._id })
            .sort({ _id: -1 })
            .populate("owner")
            .populate("agent")
            .populate("tenant");
        else
          return await Property.find()
            .sort({ _id: -1 })
            .populate("owner")
            .populate("agent")
            .populate("tenant");
      } catch (error) {
        console.log("Could not find properties", error);
      }
    },

    complaintsRaised: async (parent, args, context) => {
      try {
        const params = {};
        const propertyIds = [];
        let properties = [];
        switch (context.user.role) {
          case "owner":
            properties = await Property.find({
              owner: context.user._id,
            });
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
        properties.map((x) => propertyIds.push(x._id));

        const complaints = await Complaint.find({
          property: { $in: propertyIds },
        })
          .sort({ _id: -1 })
          .populate("property");
        return complaints;
      } catch (error) {
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
    updateProperty: async (parent, { propertyDetails, propertyId }) => {
      try {
        return await Property.findByIdAndUpdate(propertyId, propertyDetails, {
          new: true,
        });
      } catch (error) {
        console.log("Could not update property", error);
      }
    },
    addComplaint: async (parent, { complaint }, context) => {
      try {
        const properties = await Property.find({ tenant: context.user._id });
        const propertyId = properties[0]._id;
        return Complaint.create({ complaint, property: propertyId });
      } catch (error) {
        console.log("Could not raise complaint", error);
      }
    },
    updateComplaint: async (
      parent,
      { complaint, quotes, status, complaintId }
    ) => {
      try {
        if (complaint)
          return await Complaint.findByIdAndUpdate(
            complaintId,
            { complaint },
            { new: true }
          );
        else
          return await Complaint.findByIdAndUpdate(
            complaintId,
            { $set: { quotes: quotes, status: status } },
            { new: true }
          );
      } catch (error) {
        console.log("Could not update complaint", error);
      }
    },
    addApprovedQuote: async (parent, { approvedQuote, complaintId }) => {
      try {
        return await Complaint.findByIdAndUpdate(
          complaintId,
          { approvedQuote },
          { new: true }
        );
      } catch (error) {
        console.log("Could not update approved quote", error);
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
    login: async (parent, { email, password, complaintId }) => {
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
        return { token, user };
      } catch (error) {
        console.log("Login failed", error);
      }
    },
  },
};
module.exports = resolvers;
