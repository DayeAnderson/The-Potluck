const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema ({
    name: String,
    desription: String,
    imageUrl: String,
    ingredients: Array,
    instructions: String,
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe'}],
    createdBy: String
},{
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)

