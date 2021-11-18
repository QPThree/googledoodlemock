import React from "react";


class DateComponent extends React.Component {

    render() {

        return (
            <>
                
                <h3> {this.props.month} / {this.props.day} / {this.props.year}</h3>
                
            </>
        )
    }
}
export default DateComponent;
