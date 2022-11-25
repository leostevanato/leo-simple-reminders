import AsyncStorage from '@react-native-async-storage/async-storage';

function getItems() {
	return AsyncStorage.getItem('items')
		.then(response => {
			if (response)
				return Promise.resolve(JSON.parse(response));
			else
				return Promise.resolve([]);
		});
}

async function getItem(id) {
	const savedItems = await getItems();
	return savedItems.find(item => item.id === id);
}

async function saveItem(listItem, id) {
	listItem.id = id ? id : new Date().getTime()
	const savedItems = await getItems();

	if (id) {
		const index = await savedItems.findIndex(item => item.id === id);
		savedItems[index] = listItem;
	}
	else {
		savedItems.push(listItem);
	}
	
	return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

export {
	saveItem,
	getItems,
	getItem
};

