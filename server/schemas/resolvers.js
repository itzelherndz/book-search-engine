const { User, Book } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

const resolvers = {
    Query: {
        // query to find one user based on username and populate savedBooks
        user: async (parent, {username}) => {
            return User.findOne({username}).populate('savedBooks');
        },
    },
    Mutation: {
        // create a user, sign a token, and send it back
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        // login a user, sign a token, send it back
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
        }
    }
}