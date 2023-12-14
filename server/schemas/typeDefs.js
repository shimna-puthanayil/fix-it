const typeDefs = `
type Property{
_id:ID,
address:String,
owner:User,
agent:User,
tenant:User
}
type Complaint{
    _id:ID
    complaint:string,
    property:Property,
    date:String
}
type User{
    _id:ID,
    username:String,
    email:String,
    role:String
}
type Auth{
    token:ID,
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
propertiesByAgent(agentId!):[Property]
propertiesByOwner(ownerId!):[Property]
complaintsRaisedToAgent(agentId!):[Complaint]
complaintsOfPropertyByOwner(ownerId!):[Complaint]
complaintsRaisedByTenant(tenantId!):[Complaint]
}
type Mutation{
addProperty(propertyDetails:propertyInput!):Property
addComplaint(complaint:String!,property:ID!):Complaint
addUser(username:String!,password:String!,email:String!,role:String):Auth
login(email: String!, password: String!): Auth
}`;
module.exports = typeDefs;
