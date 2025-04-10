import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name: 'Maksim L.', salary: 800, increase: true, star: true, id: uuidv4()},
                {name: 'Andrey K.', salary: 3000, increase: false, star: false, id: uuidv4()},
                {name: 'Michael A.', salary: 5000, increase: true, star: false, id: uuidv4()},
                {name: 'Anar S.', salary: 10000, increase: false, star: false, id: uuidv4()},
            ]
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            star: false,
            id: uuidv4()
        }
        if (name.length < 3 || !salary) {
            return;
        } else {
            this.setState(({data}) => {
            
                return {
                    data: [...data, {...newItem}]
                }
            });
        }
        
    }

    onToggleProp = (id, prop) => {

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        const { data } = this.state;
        const employees = data.length;
        const employeesOnIncrease = data.filter(item => item.increase === true).length;
        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    employeesOnIncrease={employeesOnIncrease}
                    />
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;