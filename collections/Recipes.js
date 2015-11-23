Recipes = new Mongo.Collection('recipes'); //Define the collection.

Recipes.allow({
	insert: function(userId, doc){
		return !!userId;//if userId exist
	},
	update: function(userId, doc){
		return !!userId;//if userId exist
	}
});

Ingredient = new SimpleSchema({
	name: {
		type: String
	},
	amount: {
		type: String
	}
});

RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
	},
	desc: {
		type: String,
		label: "Desciption"
	},
	ingredients: {
		type: [Ingredient]
	},
	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform:{
			type: "hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},	
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date()//return the current date timestamp to the schema
		},
		autoform: {
			type: "hidden"
		}
	}
});

Meteor.methods({
	toggleMenuItem: function(id, currentState){
		Recipes.update(id,{
			$set: {
				inMenu: !currentState //make it opposite of currstate
			}
		})
	}
});

Recipes.attachSchema(RecipeSchema);