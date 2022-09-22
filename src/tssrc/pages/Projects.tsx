import { useEffect, useState, FC } from "react";

type Project = {
    name: string;
    link: string;
    image: string;
    description: string;
}

const Projects: FC = () => {

    const [projects, setProjects] = useState<Array<Project>>([]);

    const fakeProjectsData: Array<Project> = [
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
        {
            name: 'AI',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '../../assets/logo.png',
            description: 'This was an AI project for school '
        },
    ];

    useEffect(() => {
        console.log("getting project data");
        setProjects(fakeProjectsData)
    }, [])

    return (
        <div className="w-100 h-100 projects-container">
            <div className='row g-5'>
                {projects.map((project, index) => {
                    return (
                        <div key={index} className='col-md-3'>
                            <div className="card card-box-shadow">
                                <img className="card-img-top border" src={require('../../assets/actionpy.png')} alt="Project Image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{project.name}</h5>
                                        <p className="card-text">{project.description}</p>
                                        <a href={project.link} className="btn btn-primary">GitHub Project</a>
                                    </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Projects