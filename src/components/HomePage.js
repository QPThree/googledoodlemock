import axios from "axios";
import React from "react";

import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import DoodleCard from "./DoodleCard";
import DateComponent from "./DateComponent";


class HomePage extends React.Component {

    constructor(props) {
        let date = new Date();
        console.log(date.toLocaleString());
        console.log(date.getMonth());
        super(props);
        this.state = {
            month: date.getMonth() + 1,
            day: date.getDate(),
            year: date.getFullYear(),
            userInput: "",
            data: [],
            displayData: false,
            displayError: false,
            errorMessage: "Date must match mm/dd/yyyy format",
            showForm: false,
            filteredData: [],
            filteredDoodles: [],
        }
    }

    componentDidMount = () => {
        this.getDoodles();
    }
    
    getDoodles = async () => {
        // e.preventDefault();
        console.log("GET DOODLES()");
        let allResultsFromAxios = [];
        let filteredResultsFromAxios = [];
        let year = this.state.year;
        try {
            for (let i = 0; i < 20; i++) {
                year--;
                const data = await axios.get(`https://goodle-backend.herokuapp.com/doodles/${year}/${this.state.month}`);
                const filteredData = data.data.map(obj => {
                    if (parseInt(obj.run_date_array[2]) == parseInt(this.state.day)) {
                        filteredResultsFromAxios.push(obj);

                    }
                });
                allResultsFromAxios.push(data.data);
                this.setState({
                    data: allResultsFromAxios,
                    displayData: true,
                    filteredData: filteredResultsFromAxios,

                });
            }
            console.log("STATE AFTER getDOODLES TRY BLOCK:", this.state);
        }
        catch (err) {
            console.log(err.response);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let input = e.target.value.split("");
        this.setState({
            month: input.slice(0, 2).join(""),
            day: input[3] + "" + input[4],
            year: input.slice(6).join(""),
            userInput: e.target.value,
        });
    }

    filterDoodles = () => {
        console.log("FILTERING");
        let solution = [];
        try {
            if (this.state.displayData) {
                this.state.data.map(year => {
                    year.map((obj, index) => {
                        if (parseInt(obj.run_date_array[2]) == parseInt(this.state.day)) {
                            solution.push(obj);

                        }
                    })
                });

            }
            console.log("SOLTUION ARRAY", solution);
            this.setState({
                filteredDoodles: solution,
            });
            console.log("POST FILTER,", this.state);
            this.forceUpdate();
        } catch (error) {
            console.log(error.errorMessage);
        }

    }
    setShowForm = (e) => {
        this.setState({
            showForm: true,
        })
    }

    setHideForm = (e) => {
        this.setState({
            showForm: false,
        })
    }

    moveDayBack = (e) => {
        let day = parseInt(this.state.day);
        day = day - 1;
        this.setState({
            day: day.toString(),
        });
        this.getDoodles();
    }

    moveDayForward = (e) => {
        let day = parseInt(this.state.day);
        day = day + 1;
        this.setState({
            day: day.toString(),
        });
        this.getDoodles();
    }
    
    render() {
        let doodles = this.state.filteredData.forEach(obj => <DoodleCard
            name={obj.name}
            title={obj.title}
            url={obj.url}
            dateArr={obj.run_date_array}

        />)


        return (
            <>
                <h1 className="App">Today in Google Doodles History"</h1>

                <Container className="inline-center" style={{ width: "25vw" }} >

                    {this.state.showForm ? "" : <div onClick={() => this.moveDayBack()}><i class="bi bi-arrow-left"></i></div>}
                    <Container onMouseEnter={() => this.setShowForm()} onMouseLeave={() => this.setHideForm()}>

                        {this.state.showForm ? <Form className='form'>
                            <Form.Group>
                                <Form.Control onChange={this.handleSubmit} type="text" size="md" />
                                <Button className='button' variant="primary" type="submit" onClick={this.getDoodles}>Get Doodles</Button>
                            </Form.Group>
                        </Form>
                            : <DateComponent
                                day={this.state.day}
                                month={this.state.month}
                                year={this.state.year}
                            />}
                    </Container>
                    {this.state.showForm ? "" : <div onClick={() => this.moveDayForward()}> <i class="bi bi-arrow-right"></i></div>}
                </Container>
                {this.state.displayError ? <Alert variant="danger">
                    {this.state.errorMessage}
                </Alert> : ""}
                <Container className="flexbox">
                    {this.state.displayData && this.state.filteredData.map(obj => <DoodleCard
                        name={obj.name}
                        title={obj.title}
                        url={obj.url}
                        dateArr={obj.run_date_array}

                    />)}
                </Container>
            </>



        )
    }
}

export default HomePage;