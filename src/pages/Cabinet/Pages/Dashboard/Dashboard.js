import React, {Component} from 'react';
import {Button} from "reactstrap";

class Dashboard extends Component {
    render() {

        let array = ["Margilon", "Fargona", "Toshkent", "Qoqon", "Andijon", "Quva"]

        const checkArray = (letter) => {
            console.clear()
            console.log("Letter: " + letter)
            console.log("Array: " + array)
            // for (let i =0; i < array.length; i++){
            //     if (array[i].substring(0,1) === letter){
            //         console.log(array[i].toUpperCase())
            //     }
            // }


            // array.filter(item => item.substring(0,1) === letter).forEach(item => console.log(item.toUpperCase()))
            // array.forEach(item => item.substring(0,1) === letter ? console.log(item.toUpperCase()) : '')
        }

        return (
            <div>
                Dashboard
                <hr/>
                <Button onClick={() => checkArray("Q")}>Check Array</Button>
            </div>
        );
    }
}

export default Dashboard;