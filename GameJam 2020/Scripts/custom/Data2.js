d.tasks =
{
	lakewater: {
		type: "gather",
		tab: "scavenge",
		name: "Lake water",
		log: "Found a muddy lake near the camp.",
		title: "Extract water from the lake",
		desc: "The dirty brown water is not suitable for drinking.",
		effort: "1000",
		durability: -1,
		icon: "",
		loot: [
			{ id: "dirtywater", count: 3 }
		],
		ntasks: [
			{ id: "boilwater", maxglob: 1 }
		],
	},

	wheatfield: {
		type: "gather",
		tab: "scavenge",
		name: "Wheat field",
		title: "Harvest wheat from the field",
		log: "Found a field of wheat.",
		effort: "500",
		durability: -1,
		icon: "",
		loot: [
			{ id: "wheat", count: 2 }
		],
		ntasks: [
			{ id: "makebread", maxglob: 1 }
		],
	},

	cuttrees: {
		type: "gather",
		tab: "scavenge",
		name: "Forest",
		title: "Cut trees for wood.",
		log: "Found a large lush forest.",
		effort: "2000",
		durability: -1,
		icon: "",
		loot: [
			{ id: "wood", count: 2 },
			{ id: "wood", count: 4, prob: 0.5 }
		],
	},

	buildcampfire: {
		type: "build",
		tab: "craft",
		name: "Campfire",
		title: "Lit the campfire",
		desc: "Getting fire up and running will let you cook meat for food.",
		log: "There is a firepit but the fire is out.",
		effort: "1000",
		durability: 1,
		icon: "",
		requires: [
			{ id: "wood", count: 8 }
		],
		loot: [
			{ id: "campfire", count: 1 }
		],
	},

	makebread: {
		type: "cook",
		tab: "cook",
		name: "Bake bread",
		title: "Bake bread",
		effort: "1000",
		durability: -1,
		icon: "",
		food: { min: 4, max: 6 },
		tech: [
			{ id: "campfire", count: 1 }
		],
		requires: [
			{ id: "wheat", count: 2 }
		],
	},

	boilwater: {
		type: "cook",
		tab: "cook",
		name: "Boil water",
		title: "Boil dirty water",
		description: "After boiling the water it becomes drinkable.",
		effort: "500",
		durability: -1,
		icon: "",
		water: { min: 3, max: 5 },
		tech: [
			{ id: "campfire", count: 1 }
		],
		requires: [
			{ id: "dirtywater", count: 1 }
		]
	},
}

d.GeneralItems =
	[
		{
			name: "People",
			amount: 0,
			icon: "fas fa-male"
		},

		{
			name: "Money",
			amount: 0,
			icon: "fas fa-dollar-sign"
		},

		{
			name: "Food",
			amount: 25,
			icon: "fas fa-utensils"
		},

		{
			name: "Water",
			amount: 30,
			icon: "fas fa-tint"
		},

		{
			name: "medkits",
			amount: 0,
			icon: "fas fa-medkit"
		}
	]

d.Categories =
	[{
		name: "resources",
		icon: "",
		items: [
			{ name: "wood", icon: "", amount: 0 },
			{ name: "plank", icon: "", amount: 0 },
			{ name: "stone", icon: "", amount: 0 },
			{ name: "iron", icon: "", amount: 0 },
			{ name: "herbs", icon: "", amount: 0 },
			{ name: "meat", icon: "", amount: 0 },
			{ name: "cloth", icon: "", amount: 0 },
			{ name: "alcohol", icon: "fas fa-tint", amount: 0 },
			{ name: "wheat", icon: "", amount: 0 },
			{ name: "dirtywater", icon: "fas fa-tint", amount: 0 },
			{ name: "corn", icon: "", amount: 0 },
			{ name: "plastic", icon: "", amount: 0 },
			{ name: "electronics", icon: "", amount: 0 },
			{ name: "string", icon: "", amount: 0 },
			{ name: "fish", icon: "", amount: 0 },
		]
	},

	{
		name: "scrap",
		icon: "",
		items: [
			{ name: "scrap iron", icon: "", amount: 0 },
			{ name: "tires", icon: "", amount: 0 },
		]
	},

	{
		name: "buildings",
		icon: "",
		items: [
			{ name: "campfire", icon: "", amount: 0 },
			{ name: "fall trap", icon: "", amount: 0 },
			{ name: "well", icon: "", amount: 0 },
			{ name: "sawmill", icon: "", amount: 0 },
			{ name: "science lab", icon: "", amount: 0 },
			{ name: "kitchen", icon: "", amount: 0 },
			{ name: "distillery", icon: "", amount: 0 },
			{ name: "infirmary", icon: "", amount: 0 },
			{ name: "watch tower", icon: "", amount: 0 },
			{ name: "effigy", icon: "", amount: 0 },
		]
	},

	{
		name: "tools",
		icon: "",
		items: [
			{ name: "fishing rod", icon: "", amount: 0 },
		]
	}]

d.Tabs =
	[{
		name: "Scavenge",
		icon: "fas fa-tree",
		isActive: true,
		isVisible: true,
		tasks: [
			{
				type: "gather",
				tab: "Scavenge",
				name: "Lake water",
				log: "Found a muddy lake near the camp.",
				title: "Extract water from the lake",
				desc: "The dirty brown water is not suitable for drinking.",
				effort: "1000",
				durability: -1,
				dleft: -1,
				icon: "fas fa-tint",
				isFound: true,
				isVisible: true,
				people: [],
				progress: 0,
				loot: [
					{ id: "dirtywater", count: 3 }
				],
				ntasks: [
					{ id: "boilwater", maxglob: 1 }
				],
			},
			{
				type: "gather",
				tab: "Scavenge",
				name: "Wheat field",
				title: "Harvest wheat from the field",
				log: "Found a field of wheat.",
				effort: "500",
				durability: -1,
				dleft: -1,
				icon: "",
				isFound: true,
				isVisible: true,
				people: [],
				progress: 0,
				loot: [
					{ id: "wheat", count: 2 }
				],
				ntasks: [
					{ id: "makebread", maxglob: 1 }
				],
			},
			{
				type: "gather",
				tab: "Scavenge",
				name: "Forest",
				title: "Cut trees for wood.",
				log: "Found a large lush forest.",
				effort: "2000",
				durability: -1,
				dleft: -1,
				icon: "",
				isFound: true,
				isVisible: true,
				people: [],
				progress: 0,
				loot: [
					{ id: "wood", count: 2 },
					{ id: "wood", count: 4, prob: 0.5 }
				],
			}
		]
	},

	{
		name: "Cook",
		icon: "fas fa-utensils",
		isActive: false,
		isVisible: true,
		tasks: [
			{
				type: "cook",
				tab: "Cook",
				name: "Bake bread",
				title: "Bake bread",
				effort: "1000",
				durability: -1,
				dleft: -1,
				icon: "fas fa-utensils",
				isFound: true,
				isVisible: true,
				people: [],
				progress: 0,
				food: { min: 4, max: 6 },
				tech: [
					{ id: "campfire", count: 1 }
				],
				requires: [
					{ id: "wheat", count: 2 }
				],
			},
			{
				type: "cook",
				tab: "Cook",
				name: "Boil water",
				title: "Boil dirty water",
				description: "After boiling the water it becomes drinkable.",
				effort: "500",
				durability: -1,
				dleft: -1,
				icon: "",
				isFound: true,
				isVisible: true,
				people: [],
				progress: 0,
				water: { min: 3, max: 5 },
				tech: [
					{ id: "campfire", count: 1 }
				],
				requires: [
					{ id: "dirtywater", count: 1 }
				]
			},
		]
	},

	{
		name: "Craft",
		icon: "fas fa-tools",
		isActive: false,
		isVisible: true,
		tasks: [
			{
				type: "build",
				tab: "Craft",
				name: "Campfire",
				title: "Lit the campfire",
				desc: "Getting fire up and running will let you cook meat for food.",
				log: "There is a firepit but the fire is out.",
				effort: "1000",
				durability: 1,
				dleft: 1,
				icon: "",
				isFound: true,
				isVisible: true,
				people: [],
				progress: 0,
				requires: [
					{ id: "wood", count: 8 }
				],
				loot: [
					{ id: "campfire", count: 1 }
				],
			},
		]
	},

	{
		name: "Research",
		icon: "fas fa-flask",
		isActive: false,
		isVisible: true,
		tasks: [

		]
	},

	{
		name: "Trade",
		icon: "fas fa-balance-scale-left",
		isActive: false,
		isVisible: true,
		tasks: [

		]
	},
	]