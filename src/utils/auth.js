// src/utils/auth.js

export function checkCredentials(username, password) {
	const validUsers = [
		{ username: "admin", password: "12345" },
		{ username: "test", password: "qwerty" },
	];

	return validUsers.some((user) => user.username === username && user.password === password);
}
