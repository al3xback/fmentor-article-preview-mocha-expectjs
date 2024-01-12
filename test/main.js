import expect from 'expect.js';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url =
	'https://al3xback.github.io/fmentor-article-preview-mocha-expectjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a card title element with min length of 36', () => {
		let cardTitle = document
			.querySelector('.card__title')
			.textContent.trim();

		if (/\n/.test(cardTitle)) {
			cardTitle = cardTitle.replace(/\n/g, ' ');
		}

		if (/\t/.test(cardTitle)) {
			cardTitle = cardTitle.replace(/\t/g, '');
		}

		expect(cardTitle.length).to.be.greaterThan(35);
	});

	it("should have a card title element that contains 'look and feel' word", () => {
		let cardTitle = document
			.querySelector('.card__title')
			.textContent.trim();

		if (/\n/.test(cardTitle)) {
			cardTitle = cardTitle.replace(/\n/g, ' ');
		}

		if (/\t/.test(cardTitle)) {
			cardTitle = cardTitle.replace(/\t/g, '');
		}

		expect(cardTitle).to.contain('look and feel');
	});

	it("should have an author name element which doesn't contain number in its content", () => {
		const cardAuthorName = document
			.querySelector('.card__author-name')
			.textContent.trim();

		expect(cardAuthorName).to.not.match(/[0-9]/g);
	});
});
