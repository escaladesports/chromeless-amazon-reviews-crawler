'use strict'
const Chromeless = require('chromeless').default
const randomUa = require('random-ua')
const evalFunction = require('amazon-reviews-crawler-eval')
const defaultOptions = {
	page: 'https://www.amazon.com/product-reviews/{{asin}}/ref=cm_cr_arp_d_viewopt_srt?reviewerType=all_reviews&pageNumber=1&sortBy=recent',
	stopAtReviewId: false
}

module.exports = (asin, opt) => {
	return new Promise((resolve, reject) => {
		opt = Object.assign({}, defaultOptions, opt)
		new Chromeless({
				remote: {
					endpointUrl: opt.endpointUrl,
					apiKey: opt.apiKey
				}
			})
			.setUserAgent(opt.userAgent || randomUa.generate())
			.goto(opt.page.replace('{{asin}}', asin))
			.evaluate(evalFunction, opt)
			.end(obj => obj)
			.then(resolve)
			.catch(reject)
	})
}