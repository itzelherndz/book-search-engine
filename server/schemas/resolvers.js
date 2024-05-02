const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // query to find one user based on username and populate savedBooks
        user: async (parent, {username}) => {
            return User.findOne({username}).populate('savedBooks');
        },
    },
    Mutation: {
        // create a user, sign a token, and send it back
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        // login a user, sign a token, send it back
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { user, token };
        },
        // finds a user and updates it with the body that includes the book information
        saveBook: async (parent, {userId, authors, description, bookId, image, title}) => {
            const body = {authors, description, bookId, image, link, title};
            return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
              ); 
        },
        // finds user and removes saved book given parameters of the bookId
        removeBook: async (parent, {user, params}) => {
            return User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
              );
        }

    }
};

module.exports = resolvers;