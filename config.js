// Setting up configuration for API
module.exports = {
	'port' : process.env.port || 8080,
	'database' : 'mongodb://root:admin@ds047732.mongolab.com:47732/v1' ,
	'email': {
		'service': 'gmail',
		'auth': {
			'user':  'vagadevjlle@gmail.com',
			'pass': 'vagadevjoinville'
		}
	},
	'emailFrontEnd': {
		'subject': 'Obrigado por se candidatar',
		'text': 'Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador Front-End entraremos em contato.'
	},
	'emailBackEnd': {
		'subject': 'Obrigado por se candidatar',
		'text': 'Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador Back-End entraremos em contato.'
	},
	'emailMobile': {
		'subject': 'Obrigado por se candidatar',
		'text': 'Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador Mobile entraremos em contato.'
	},
	'emailGeneral': {
		'subject': 'Obrigado por se candidatar',
		'text': 'Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador entraremos em contato.'
	}
}