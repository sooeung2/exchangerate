import React from 'react';
import DatePicker from 'material-ui/DatePicker';

//Presentational component for rendering hisotical picker
//The date makes sure it can't select the future date and before 1/1/99

const HistoricalView = ({message, onChange}) => {
	return(
		<div>
	    <DatePicker
				hintText="Pick a Date to View Historical Rate"
				minDate={new Date(1999, 0, 1)}
				maxDate={new Date()}
				fullWidth={true}
				onChange={onChange}
			/>
			<div>
				{message}
			</div>
	  </div>
	)
}

export default HistoricalView;
