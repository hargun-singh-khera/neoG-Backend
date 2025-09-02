const express = require("express")
const app = express()

const { connectDB } = require("./db/db.connect.js")
const Recipe = require("./models/recipe.models.js")

connectDB()
app.use(express.json())

const port = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("My Express App : BE4_Assignment2")
})

async function createRecipeData(recipeData) {
    try {
        const newRecipe = new Recipe(recipeData)   
        return await newRecipe.save()     
    } catch (error) {
        throw error
    }
}

app.post("/recipes", async (req, res) => {
    try {
        const newRecipe = await createRecipeData(req.body)
        res.status(201).json({message: "Recipe created successfully", recipe: newRecipe})
    } catch (error) {
       res.status(500).json({error: "Failed to create a new recipe."}) 
    }
})

async function readAllRecipes() {
    try {
        const recipes = await Recipe.find()
        return recipes
    } catch (error) {
        throw error
    }
}

app.get("/recipes", async (req, res) => {
    try {
        const recipes = await readAllRecipes()
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
})

async function readRecipesByTitle(recipeTitle) {
    try {
       const recipes = await Recipe.findOne({title: recipeTitle})
       return recipes 
    } catch (error) {
        throw error
    }
}

app.get("/recipes/:recipeTitle", async (req, res) => {
    try {
        const recipes = await readRecipesByTitle(req.params.recipeTitle)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
})

async function readRecipesByAuthor(recipeAuthor) {
    try {
        const recipes = await Recipe.find({author: recipeAuthor})
        return recipes
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
}

app.get("/recipes/author/:authorName", async (req, res) => {
    try {
        const recipes = await readRecipesByAuthor(req.params.authorName)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
})

async function readRecipesByDifficulty(recipeDifficultyLevel) {
    try {
        const recipes = await Recipe.find({difficulty: recipeDifficultyLevel})
        return recipes        
    } catch (error) {
        throw error
    }
}

app.get("/recipes/difficulty/:difficultyLevel", async (req, res) => {
    try {
        const recipes = await readRecipesByDifficulty(req.params.difficultyLevel)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
})

async function updateRecipeById(recipeId, dataToUpdate) {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        return updatedRecipe
    } catch (error) {
        throw error
    }
}


app.post("/recipes/:recipeId", async (req, res) => {
    try {
        const updatedRecipe = await updateRecipeById(req.params.recipeId, req.body)
        if(updatedRecipe) {
            res.status(200).json({message: "Recipe updated successfully", recipe: updatedRecipe})
        }
        else {
            res.status(404).json({error: "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update recipe."})
    }
})

async function updateRecipeByTitle(recipeTitle, dataToUpdate) {
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate(
            {title: recipeTitle}, 
            dataToUpdate, 
            {new: true}
        )
        return updatedRecipe
    } catch (error) {
        throw error
    }
} 

app.post("/recipes/title/:recipeTitle", async (req, res) => {
    try {
        const updatedRecipe = await updateRecipeByTitle(req.params.recipeTitle, req.body)
        if(updatedRecipe) {
            res.status(200).json({message: "Recipe updated successfully", recipe: updatedRecipe})
        }
        else {
            res.status(404).json({error: "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update recipe."})
    }
})

async function deleteRecipeById(recipeId) {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
        if(!deletedRecipe) {
            res.status(404).json({error: "Recipe not found."})
        }        
    } catch (error) {
        throw error
    }
}

app.delete("/recipes/:recipeId", async (req, res) => {
    try {
        await deleteRecipeById(req.params.recipeId)
        res.status(200).json({message: "Recipe deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to delete recipe."})
    }
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})








