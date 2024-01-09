const typeDefs = `
type Property{
   _id:ID
   address:String
   owner:User
   agent:User
   tenant:User
}
type Complaint{
    _id:ID
    complaint:String
    property:Property
    date:String
    status:String
}
type User{
    _id:ID
    username:String
    email:String
    role:String
}
type Auth{
    token:ID
    user:User
}

input propertyInput{
address:String!
owner:ID!
agent:ID!
tenant:ID!
}
type Query{
user:User
properties:[Property]
propertiesByAgent(agentId:ID!):[Property]
propertiesByOwner(ownerId:ID!):[Property]
complaintsRaised:[Complaint]
complaintsOfPropertyByOwner(ownerId:ID!):[Complaint]
complaintsRaisedByTenant(tenantId:ID!):[Complaint]
}
type Mutation{
addProperty(propertyDetails:propertyInput):Property
addComplaint(complaint:String!):Complaint
addUser(username:String!,password:String!,email:String!,role:String!):Auth
updateComplaint(quotes:String!,status:String,complaintId:String):Complaint
login(email: String!, password: String!): Auth
}`;
module.exports = typeDefs;
