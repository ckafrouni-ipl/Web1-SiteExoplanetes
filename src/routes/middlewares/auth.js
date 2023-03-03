module.exports.requiresAuthentication = async (req, res, next) => {
	if (req.session.isAuth) {
		next()
	} else {
		req.session.redirectUrl = req.originalUrl
		res.redirect('/users/login')
	}
}

module.exports.requiresAuthorization = (role) => async (req, res, next) => {
	if (req.session.role === role) {
		return next()
	}
	res.redirect('/users/login')
}