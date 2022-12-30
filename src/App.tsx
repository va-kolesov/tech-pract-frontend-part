import React from 'react';
import './App.css';
import StudentsList from './page/StudentsList';
import Student from './Page/Student';
 
interface AppState {
    currentPage: 'list' | 'student';
    selectedStudentID: number | null; 
}

class App extends React.Component<{}, AppState> {
    state: AppState;
    constructor(props: {}) {
        super(props);
        this.state = {
            currentPage: 'student',
            selectedStudentID: 12345678
        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className='App'>
                <div className='App-Content Content-Column'>
                    {
                        this.state.currentPage === 'list'
                        ? <StudentsList 
                            onAddStudent={
                                (ID: number) => this.setState({
                                    currentPage: 'student',
                                    selectedStudentID: null
                                }) 
                            }
                            onOpenStudent={
                                (ID: number) => this.setState({
                                    currentPage: 'student',
                                    selectedStudentID: ID
                                }) 
                            }
                        />
                        : <Student 
                            selectedStudentID={this.state.selectedStudentID}
                            onExit={() => this.setState({currentPage: 'list'})}/>}
                </div>
            </div>
        );
    }
}

export default App;
