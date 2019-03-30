import jwt from "jsonwebtoken";

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

export default {
  Query: {
    hello: () => "Hello",
    getAllRecipes: async (parent, args, { Recipe }) => {
      const allRecipes = await Recipe.find();
      return allRecipes;
    },
  },
  Mutation: {
    addRecipe: async (parent, { data }, { Recipe }) => {
      console.log(data);
      const newRecipe = await new Recipe({
        name: data.name,
        category: data.category,
        description: data.description,
        instructions: data.instructions,
        createdAt: data.createdAt,
        likes: data.likes,
        username: data.username,
      }).save();

      return newRecipe;
    },
    signupUser: async (parent, { data }, { User }) => {
      const user = await User.findOne({ username: data.username });

      if (user) {
        throw new Error("User already exits");
      }

      const newUser = await User({
        username: data.username,
        email: data.email,
        password: data.password,
      }).save();

      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
  },
};
