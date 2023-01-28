import React from 'react';
import './App.css';
import StudentsList from './page/StudentsList';
import Student from './Page/Student';
import {
    getDepartments,
    getFacults,
    getTypeEducation,
    ISelectorData
} from './Api';
import Overlay from './page/Overlay';
 
interface AppState {
    currentPage: 'list' | 'student';
    selectedStudentID: number | null; 
    commonData: {
        departments: ISelectorData[],
        facults: ISelectorData[],
        educations: ISelectorData[]
    } | null
}

class App extends React.Component<{}, AppState> {
    state: AppState;
    constructor(props: {}) {
        super(props);
        this.state = {
            currentPage: 'list',
            selectedStudentID: null,
            commonData: null 
        };
    }
    componentDidMount() {
        Promise.allSettled([getDepartments(), getFacults(), getTypeEducation()])
            .then(([departments, facults, educations]) => {
                this.setState({
                    commonData: {
                        departments: departments.status === 'fulfilled' ? departments.value : [],
                        facults: facults.status === 'fulfilled' ? facults.value : [],
                        educations: educations.status === 'fulfilled' ? educations.value : []
                    }
                })
            });
    }
    render() {
        return (
            <div className='App'>
                <div className='App-Content Content-Column'>
                    {
                        this.state.commonData && this.state.currentPage === 'list'
                        ? <StudentsList 
                            educations={this.state.commonData.educations}
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
                        /> : null
                    }
                    {
                        this.state.commonData && this.state.currentPage === 'student'
                        ? <Student 
                            educations={this.state.commonData.educations}
                            departments={this.state.commonData.departments}
                            facults={this.state.commonData.facults}
                            selectedStudentID={this.state.selectedStudentID}
                            onExit={() => this.setState({currentPage: 'list'})}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}

export default App;
