exports.isAuth = (req) => {
	return !!(req.session && req.session.user && req.session.user.username);
}