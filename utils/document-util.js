module.exports = {
	validate: (data) => {
		const title = data.title;
		const content = data.content;
		let validTitle = title.replace(/\s/g, '');
		let validContent = content.replace(/\s/g, '');
		if (!validTitle) {
			return 'The title cannot be an emplty field';
		}
		else if (!validContent) {
			return 'The content cannot be an emplty field';
		} else {
			return data;
		}
	}
};