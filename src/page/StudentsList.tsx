import React from 'react';
import { Dict, getStudentsList, ISelectorData, IStudentData } from '../Api';
import Grid, { ColumnProps } from '../grid/Grid';
import {default as List} from '../list/List';
import Overlay from './Overlay';
import './StudentsList.css';
import {Add} from '../Icons';
interface StudentsListProps {
    onOpenStudent: Function;
    onAddStudent: Function;
    educations: ISelectorData[];
}
 
interface StudentsListState {
    bach: IStudentData[] | null;
    spec: IStudentData[] | null;
    magi: IStudentData[] | null;
    headerColumns: ColumnProps[];
    loaded: boolean;
}

class StudentsList extends React.Component<StudentsListProps, StudentsListState> {
    state: StudentsListState;
    constructor(props: StudentsListProps) {
        super(props);
        const headerColumns = this.props.educations.map((ed) => ({
            header: ed.name,
            displayProperty: ed.name
        }))
        this.state = {
            loaded: false,
            headerColumns,
            bach: null,
            spec: null,
            magi: null
        }
    }

    componentDidMount() {
        getStudentsList().then((students) => {
            this.setState({
                loaded: true,
                bach: students.filter((stud) => stud.Degree === this.props.educations[0].id),
                spec: students.filter((stud) => stud.Degree === this.props.educations[1].id),
                magi: students.filter((stud) => stud.Degree === this.props.educations[2].id)
            });
        }).catch(() => {
                this.setState({
                loaded: true,
                bach: null,
                spec: null,
                magi: null
            });
        });
    }

    template = ({data}: {data: Dict}): React.ReactElement => {
        const ID = (data as IStudentData).ID;
        const finished = (data as IStudentData).Finished
        const FullName = (data as IStudentData).FullName
        const [name, second, father]: string[] = FullName.split(' ') as string[];
        return (
        <div onClick={() => this.props.onOpenStudent(ID)}
            className={'StudentsList-item StudentsList-item_' + (finished ? 'finished' : 'notFinished' )}>
            <div>{name}</div>
            <div>{second}</div>
            <div>{father}</div>
            <div>{ID}</div>
        </div>
        );
    }

    render() { 
        return ( 
            <div className='StudentsList Content-Column'>
                <Overlay enabled={!this.state.loaded}/>
                <span className='Heading'>Список студентов
                <Add onClick={() => {
                    this.props.onAddStudent();
                }}/></span>
                <Grid data={[]} columnsProps={this.state.headerColumns} ></Grid>
                <div className='Content-Row'>
                    <List colorStyle='violet' template={this.template} data={this.state.bach}/>
                    <List colorStyle='green' template={this.template} data={this.state.spec}/>
                    <List colorStyle='red' template={this.template} data={this.state.magi}/>
                </div>
            </div>
        );
    }
}

export default StudentsList;
