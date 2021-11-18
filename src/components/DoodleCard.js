import axios from "axios";
import React from "react";
import { Form, Button, Card, Container } from 'react-bootstrap';

class DoodleCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: ['red', 'blue', 'green', 'yellow'],
        }
    }
    getRandomColor = () => {
        let index = Math.floor(Math.random() * this.state.colors.length);
        return this.state.colors[index];
    }


    render() {
        return (
            <>
                <Card className="m-2 card" style={{ width: "25vw" }}>
                    <Card.Img alt={this.props.title} src={this.props.url} />
                    <Card.Body>
                        {this.props.title}
                        <br />
                        {this.props.dateArr[0]}, {this.props.dateArr[1]}, {this.props.dateArr[2]}
                        <br />

                        <a href={`http://google.com/search?q=${this.props.title}`}>
                            <Button className="mt-4"backgroundColor={this.getRandomColor()} size="lg">What in the Doodle?</Button>
                        </a>
                    </Card.Body>

                </Card>
            </>
        )
    }
}

export default DoodleCard;