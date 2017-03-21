import React,{ PropTypes } from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';


//Presentational component for renddering input field

const CurrencyConverterView = (props) => {

	return (
		<div>
			<TextField
				type='number'
				value={props.currencyValue}
				onChange={props.onChangeValue}
				fullWidth={true}
				hintText="Type in an amount"
			/>
			<SelectField
				fullWidth={true}
				value={props.currencyType} onChange={props.onChangeType}>
				{ _.map(props.currencies, (currency, key) =>
					<MenuItem key={key} value={key} primaryText={currency} />
				) }
			</SelectField>
		</div>
	)
}

CurrencyConverterView.propTypes = {
	currencyValue: PropTypes.number,
	currencyType: PropTypes.string,
	currencies: PropTypes.object,
	onChangeValue: PropTypes.func,
	onChangeType: PropTypes.func,
}

export default CurrencyConverterView;
