import React, { Component } from 'react';
import moment from 'moment';
import CurrencyConverterView from './CurrencyConverterView';
import HistoricalView from './HistoricalView';

//smart component for managing state

const styles = {
	container: {
		maxWidth: '700px',
		padding: '20px',
		margin: '0 auto',
	}
}

class CurrentCurrency extends Component {
	constructor() {
		super();
		//initial state should be 1 USD to current EUR
		this.state = {
			fromCurrType: 'USD',
			fromCurrVal: 1,
			toCurrType: 'EUR',
			toCurrVal: 0,
		}
		this.currencies = {}
		this.rates = {
			selectedDate: 'today',
			fetchedAt: new Date(),
			today: {},
			historical: {},
		}
		this.handleFromCurrVal = this.handleFromCurrVal.bind(this)
		this.handleFromCurrType = this.handleFromCurrType.bind(this)
		this.handleToCurrVal = this.handleToCurrVal.bind(this)
		this.handleToCurrType = this.handleToCurrType.bind(this)
		this.handleDate = this.handleDate.bind(this)
	}

	//when first loading, fetch current rate
	componentWillMount() {
		fetch('https://openexchangerates.org/api/currencies.json')
			.then(res => {
				return res.json()
			})
			.then(json => {
				this.currencies = json
			})
			.catch(error => {
					console.log(error);
			});

		this.fetchRates();

	}

  //fetch historical data from openexchangerates api
	fetchHistoricalRates(cb) {
		fetch(`https://openexchangerates.org/api/historical/${this.rates.selectedDate}.json?app_id=4425121f0f9948ffb19c2e815334977f`)
			.then(res => {
				return res.json();
			})
			.then(json => {
				this.rates.historical[this.rates.selectedDate] = json.rates
				cb();
			})
	}

	//fetch current rate from openexchangerates api
	fetchRates() {
		fetch(`https://openexchangerates.org/api/latest.json?app_id=4425121f0f9948ffb19c2e815334977f`)
			.then(res => {
				return res.json();
			})
			.then(json => {
				this.rates.today = json.rates;
				this.rates.fetchedAt = new Date();
				this.convertCurrency(this.state.fromCurrVal, this.state.fromCurrType, this.state.toCurrType, this.rates.selectedDate, 'toCurrVal')
			})
			.catch(error => {
					console.log(error);
			});
	}

	//Handle any changes from first input value
	handleFromCurrVal(e, value) {
		this.setState({fromCurrVal: Number(value.trim())}, () => {
			this.convertCurrency(this.state.fromCurrVal, this.state.fromCurrType, this.state.toCurrType, this.rates.selectedDate, 'toCurrVal')
		})
	}

	//Handle any changes from first input type
	handleFromCurrType(e, key, value) {
		this.setState({fromCurrType: value}, () => {
			this.convertCurrency(this.state.fromCurrVal, this.state.fromCurrType, this.state.toCurrType, this.rates.selectedDate, 'toCurrVal')
		})
	}

	//Handle any changes from second input value
	handleToCurrVal(e, value) {
		this.setState({toCurrVal: Number(value.trim())}, () => {
			this.convertCurrency(this.state.toCurrVal, this.state.toCurrType, this.state.fromCurrType, this.rates.selectedDate, 'fromCurrVal')
		})
	}

  //Handle any changes from second input type
	handleToCurrType(e, key, value) {
		this.setState({toCurrType: value}, () => {
			this.convertCurrency(this.state.toCurrVal, this.state.toCurrType, this.state.fromCurrType, this.rates.selectedDate, 'fromCurrVal')
		})
	}

	//Helper function for checking when the clicked calendar date is and checks if selected date is today
	handleDate(err, date) {
		const selectedDate = moment(date).format('YYYY-MM-DD');
		const today = moment().format('YYYY-MM-DD');
		this.rates.selectedDate = (selectedDate === today) ? 'today' : selectedDate;
		this.convertCurrency(this.state.fromCurrVal, this.state.fromCurrType, this.state.toCurrType, this.rates.selectedDate, 'toCurrVal')
	}

  //Checks if the fetched rate is within an hour
	//convert rate for historical rates
	convertCurrency(value, from, to, selectedDate, stateKey) {
		if (selectedDate === 'today') {
			if (Math.floor((new Date() - this.rates.fetchedAt)/60000) >= 60) {
				this.fetchRates(() => {
					this.setState({[stateKey]: this.computeCurrency(value, this.rates.today[from], this.rates.today[to])})
				})
			} else {
				this.setState({[stateKey]: this.computeCurrency(value, this.rates.today[from], this.rates.today[to])})
			}
		} else {
			if (!this.rates.historical[this.rates.selectedDate]) {
				this.fetchHistoricalRates(() => {
					this.setState({[stateKey]: this.computeCurrency(value, this.rates.historical[selectedDate][from], this.rates.historical[selectedDate][to])})
				})
			} else {
				this.setState({[stateKey]: this.computeCurrency(value, this.rates.historical[selectedDate][from], this.rates.historical[selectedDate][to])})
			}
		}
	}

	//compute currency function
	computeCurrency(value, fromRate, toRate) {
		return (value / fromRate * toRate).toFixed(2)
	}

  render() {
    return (
			<div style={styles.container}>
				<CurrencyConverterView
					currencyValue={this.state.fromCurrVal}
					currencyType={this.state.fromCurrType}
					currencies={this.currencies}
					onChangeValue={this.handleFromCurrVal}
					onChangeType={this.handleFromCurrType}
				/>
				<CurrencyConverterView
					currencyValue={this.state.toCurrVal}
					currencyType={this.state.toCurrType}
					currencies={this.currencies}
					onChangeValue={this.handleToCurrVal}
					onChangeType={this.handleToCurrType}
				/>
				<HistoricalView
					onChange={this.handleDate}
				/>
			</div>
    );
  }
}

export default CurrentCurrency;
