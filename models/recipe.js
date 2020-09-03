const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema ({
    name: String,
    description: String,
    instructions: String,
    imageUrl: String,
    ingredients: Array,
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe'}],
    createdBy: String
},{
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)

