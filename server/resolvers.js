export default {
  Query: {
    hello: () => "Hello",
    getAllRecipes: (parent, args, { Recipe }) => {
      return Recipe.find();
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
  },
};
