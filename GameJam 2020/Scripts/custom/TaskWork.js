function checkResources(dtask, consumes) {
	if (dtask.tech) {
		for (var i = 0; i < dtask.tech.length; i++) {
			var req = dtask.tech[i];
			var item = findItem(req.id);
			if (!item || item.amount < req.count) {
				return false;
			}
		}
	}
	if (dtask.requires) {
		for (var i = 0; i < dtask.requires.length; i++) {
			var req = dtask.requires[i];
			var item = findItem(req.id);
			if (!item || item.amount < req.count) {
				return false;
			}
		}
		if (consumes) {
			for (var i = 0; i < dtask.requires.length; i++) {
				removeItem(dtask.requires[i].id, dtask.requires[i].count);
			}
		}
	}
	return true;
}

function doTask(id, task, dt, effort) {
	if (!checkResources(task, false)) return false;

	task.progress += effort * dt;
	if (task.progress >= task.effort) {
		finishTask(id, task);
		task.progress -= task.effort;
	}
	return true;
}

function updateTasks(dt) {
	for (var i = 0; i < localdata.people.length; i++) {
		var person = localdata.people[i];
		if (person.task != null && person.effort != null) {
			var tabindex = localdata.tabs.findIndex((tab) => tab.name == person.task.tab);
			if (tabindex != -1) {
				var taskindex = localdata.tabs[tabindex].tasks.findIndex((ltask) => ltask.name == person.task.name);// localdata.tasks[person.task];
				if (taskindex != -1) {
					//var dtask = d.tasks[task.id];
					var task = localdata.tabs[tabindex].tasks[taskindex];
					if (task != null) {
						var success = doTask(task.name, task, dt, person.effort);
						if (success) updatePersonEffort(dt, person, task, 0);;
					}
				}
			}
		}
	}
}

function addItem(id, num = 1) {
	ditem = findItem(id);
	if (ditem == null) return;

	ditem.amount += num;
	ditem.found = true;


	log("New item: " + ditem.name, "loggreen", false);
}

function finishTask(id, task) {
	function getRandVal(obj) {
		if (obj && obj.max != undefined && obj.min != undefined) {
			var val = Math.random() * (obj.max - obj.min) + obj.min;
			return Math.round(val);
		}
		if (obj)
			console.log("ERROR: min or max value undefined min:" + obj.min + " max:" + obj.max);
		return 0;
	}

	checkResources(task, true);

	if (task.loot) {
		for (var i = 0; i < task.loot.length; i++) {
			var loot = task.loot[i];
			if (loot && loot.id) {
				var count = loot.count ? loot.count : 1;
				for (var j = 0; j < count; j++) {
					if (!loot.prob || loot.prob >= 1) {
						addItem(loot.id);
					} else {
						if (Math.random() < loot.prob) {
							addItem(loot.id);
						}
					}
				}
			}
		}
	}

	if (task.food) {
		var val = getRandVal(task.food);
		localdata.general.find((item) => item.name == "Food").amount += val;
	}
	if (task.water) {
		var val = getRandVal(task.water);
		localdata.general.find((item) => item.name == "Water").amount += val;
	}
	if (task.money) {
		var val = getRandVal(task.money);
		var Money = localdata.general.find((item) => item.name == "Money");
		if (Money.amount < 0 && val > 0) Money.amount = 0;
		Money.amount += val;
	}
	if (task.medkits) {
		var val = getRandVal(task.medkits);
		var medkit = localdata.general.find((item) => item.name == "medkits")
		if (medkit.amount < 0 && val > 0) medkit.amount = 0;
		medkit.amount += val;
	}



	if (task.foundpeople && !task.peopleFound) {
		for (var i = 0; i < task.foundpeople.length; i++) {
			var person = task.foundpeople[i];
			addPerson(person.health, person.log);
		}
		task.peopleFound = true;
	}

	if (task.ntasks && task.ntasks.length > 0) {
		var probsum = 0;
		for (var i = 0; i < task.ntasks.length; i++) {
			var ntask = task.ntasks[i];
			var prob = ntask.prob ? ntask.prob : 1;
			if (ntask.max && task.tasks[ntask.id] && task.tasks[ntask.id].count >= ntask.max) {
				prob = 0;
			}
			probsum += prob;
		}
		var randprob = Math.random() * probsum;
		probsum = 0;
		var ix = -1;
		for (var i = 0; i < task.ntasks.length; i++) {
			var ntask = task.ntasks[i];
			var prob = ntask.prob ? ntask.prob : 1;
			if (ntask.max && task.tasks[ntask.id] && task.tasks[ntask.id].count >= ntask.max) {
				prob = 0;
			}
			probsum += prob;
			if (randprob < probsum) {
				ix = i;
				break;
			}
		}
		//if (ix >= 0) {
		//	var ntask = task.ntasks[ix];
		//	if (ntask != null && d.tasks[ntask.id]) {
		//		var canAdd = true;
		//		if (ntask.maxglob && getTaskCount(ntask.id) >= ntask.maxglob) {
		//			canAdd = false;
		//		}
		//		if (ntask.max && task.tasks[ntask.id] && task.tasks[ntask.id].count >= ntask.max) {
		//			canAdd = false;
		//		}
		//		if (canAdd) {
		//			if (!task.tasks[ntask.id])
		//				task.tasks[ntask.id] = { count: 0 };
		//			task.tasks[ntask.id].count += 1;
		//			addTask(ntask.id);
		//		}
		//	}
		//}
	}

	if (task.durability > 0) {
		task.dleft -= 1;
		if (task.dleft <= 0) {
			task.isVisible = false;
		}
	}
}

function findItem(id) {
	var item
	var itemindex = -1;
	for (var i = 0; i < localdata.categories.length; i++) {
		itemindex = localdata.categories[i].items.findIndex((titem) => titem.name == id);
		if (itemindex != -1) {
			item = localdata.categories[i].items[itemindex];
			break;
		}
	}
	return item ? item : null;

}

function removeItem(id, num = 1) {
	ditem = findItem(id);
	if (ditem == null) return;
	ditem.amount -= num;
}

function updatePersonEffort(dt, person, task, attack) {
	person.hunger -= dt;
	person.thirst -= dt * 1.5;
	person.health -= dt * attack;
	if (person.hunger <= 0) {
		var Food = localdata.general.find((item) => item.name == "Food");
		if (Food.amount > 0) {
			Food.amount -= 1;;
			person.hunger += 1000;
		} else {
			person.hunger = 0;
			taskMinus(task, person);
			killPerson(person, " from hunger.");
			return;
		}
	}
	if (person.thirst <= 0) {
		var Water = localdata.general.find((item) => item.name == "Water");
		if (Water.amount > 0) {
			Water.amount -= 1;
			person.thirst += 1000;
		} else {
			person.thirst = 0;
			taskMinus(task, person);
			killPerson(person, " from thirst.");
			return;
		}
	}
	if (person.health <= 0) {
		var medkit = localdata.general.find((item) => item.name == "medkits");
		if (medkit.amount > 0) {
			medkit.amount -= 1;
			person.health += person.maxhealth;
		} else {
			person.health = 0;
			taskMinus(task, person);
			killPerson(person, " of wounds.");
			return;
		}
	}
}

function taskMinus(task, person) {
	if (person) {
		person.task = null;
		task.people = task.people.filter((tperson) => tperson.id != person.id);
	}
}

function killPerson(person, logmessage) {
	localdata.people = localdata.people.filter((lperson) => lperson.id != person.id);
	log("One of your people died" + logmessage, "logred");
}