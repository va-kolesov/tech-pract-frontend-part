import {
    STUDENTS,
    WORKS,DEPARTMENTS,
    FACULTS,
    EDUCATIONS,
    setWorks
} from './DataMock';

export type TDataType = string | number | boolean | undefined | Dict | Dict[];

export interface Dict {
    [key:string]: TDataType;
}

export interface ISelectorData extends Dict {
    id: number;
    name: string;
}

export interface IWorkData extends Dict {
    ID: number;
    Caption: string;
    AuthorID: number;
    Type: string;
    Mark: string;
    Advisor: IAdvisorData;
}

export interface IStudentData extends Dict {
    FullName: string;
    ID: number;
    Year: number;
    Degree: number;
    Faculty: number;
    Finished: boolean;
    Works?: IWorkData[];
}

export interface IAdvisorData extends Dict {
    FullName: string;
    Department: string;
    Degree: string;
}

const DELAY = 250;
const USE_MOCK = true;
const BACKEND_URL = 'http://localhost:8000/';

const API_METHODS = {
    getStudentsList: BACKEND_URL + 'getStudents',
    getStudentInfoByStudentID: BACKEND_URL + 'getStudentInfoByStudentID',
    updateStudentInfo: BACKEND_URL + 'updateStudentInfo',
    createStudent: BACKEND_URL + 'createStudent',
    removeStudent: BACKEND_URL + 'removeStudent',
    createWork: BACKEND_URL + 'createWork',
    removeWork: BACKEND_URL + 'removeWork',
    getDepartments: BACKEND_URL + 'getDepartments',
    getFacults: BACKEND_URL + 'getFacults',
    getTypeEducation: BACKEND_URL + 'getTypeEducation'
};

export function getDepartments(): Promise<ISelectorData[]> {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(DEPARTMENTS);
            });
        });
    } else {
        return fetch(
            API_METHODS.getDepartments, 
            {
                mode: 'cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then((data: {value: ISelectorData[]}) => {
            return data.value;
        });
    }
}
export function getFacults(): Promise<ISelectorData[]> {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(FACULTS);
            });
        });
    } else {
        return fetch(
            API_METHODS.getFacults, 
            {
                mode: 'cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then((data: {value: ISelectorData[]}) => {
            return data.value;
        });
    }
}
export function getTypeEducation(): Promise<ISelectorData[]> {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(EDUCATIONS)
            });
        });
    } else {
        return fetch(
            API_METHODS.getTypeEducation, 
            {
                mode: 'cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then((data: {value: ISelectorData[]}) => {
            return data.value;
        });
    }
}
export function getStudentsList(): Promise<IStudentData[]> {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(STUDENTS);
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.getStudentsList, 
            {
                mode: 'cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then((data: {value: IStudentData[]}) => {
            return data.value;
        });
    }
}
export function getStudentInfoByStudentID(ID: number): Promise<IStudentData|null> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = STUDENTS.find((student => student.ID === ID)) || null;
                const worksData = WORKS.filter((work) => work.AuthorID === ID).map(work => ({...work}));
                if (data) {
                    resolve({...data, Works: worksData});
                } else {
                    reject(`Ошбика получения данных. Студент с номером студенческого ${ID} не существует.`);
                }
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.getStudentInfoByStudentID + `?ID=${ID}`, 
            {
                mode: 'cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then(({value}: {value: IStudentData}) => {
            return value;
        }).catch((reason) => {
            alert(`Ошбика получения данных. Студент с номером студенческого ${ID} не существует.`);
        }).then();
    }
}
export function updateStudentInfo(StudentInfo: IStudentData): Promise<void> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = STUDENTS.findIndex((student => student.ID === StudentInfo.ID));
                if (index !== -1) {
                    STUDENTS[index] = {
                        ...STUDENTS[index],
                        ...StudentInfo
                    }
                    resolve();
                } else {
                    reject()
                }
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.updateStudentInfo, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(StudentInfo),
            }).catch((reason) => {
                alert(`Ошбика обновления данных. Студент с номером студенческого ${StudentInfo.ID} не существует, либо он в архиве.`);
            }).then();
    }
}
export function createStudent(StudentInfo: IStudentData): Promise<void> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = STUDENTS.findIndex((student => student.ID === StudentInfo.ID));
                if (index === -1) {
                    STUDENTS.push({
                        ...StudentInfo
                    });
                    resolve();
                } else {
                    reject(`Ошбика создания студента. Студент с номером студенческого ${StudentInfo.ID} уже существует.`);
                }
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.createStudent, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(StudentInfo),
            }).catch((reason) => {
                alert(`Ошбика создания студента. Студент с номером студенческого ${StudentInfo.ID} уже существует.`);
            }).then();
    }
}
export function updateWorks(WorksData: IWorkData[]): Promise<void> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    const worksData = WORKS.filter((work) => !WorksData.find(w => w.ID === work.data));
                    worksData.push(...WorksData);
                    setWorks(worksData);
                    resolve();
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.createWork, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(WorksData),
            }).then();
    }
}
