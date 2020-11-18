module.exports = {
	handleResponse: handleResponse
}


function handleResponse(error, response) {

	if (error) {
		if(response) {
			return {
				error: {
					status: false,
					message: error
				},
				response: response
			}
		} else {
			return {
				error: {
					status: true,
					message: error
				}
			}
		}
		
	} else {
		return {
			error: {
				status: false,
				message: ''
			},
			response: response
		}
	}
}