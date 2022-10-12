import { useEffect, useState, FC } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";

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
            name: 'Artificial Intelligence',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: require('../../assets/actionpy.png'),
            description: `
                This is a project that I made in an AI setting, 
                the intent was for an agent to establish itself
                in a game called wolfpack empire `
        },
        {
            name: 'Senior Project',
            link: 'https://github.com/SladeHirschi/senior_project',
            image: require('../../assets/budgetApp.jpeg'),
            description: `
                This is my senior project made using 
                React Native and a Golang backend.
                The project was for users to keep 
                track of their spending`
        },
        {
            name: 'C++ Complex Fractals',
            link: 'https://github.com/SladeHirschi/OpenGLFractal',
            image: require('../../assets/fractal.png'),
            description: `
                This is my first c++ project using OOP,
                classes and inheritance to set pixels
                on an image to create fractal images`
        },
        {
            name: 'Python Server',
            link: 'https://github.com/SladeHirschi/PythonServer',
            image: require('../../assets/pythonServer.png'),
            description: `
                My first ever web server, written in
                python with a very minimal javascript
                frontend. We learned how to organize
                a server to handle requests and store sessions`
        },
        {
            name: 'Costco Database',
            link: 'https://github.com/SladeHirschi/databases-final',
            image: require('../../assets/githubIcon.png'),
            description: `
                This is an example of a multi table SQL
                database with foreign keys and constraints
                to connect data and keep it consistent`
        },
        {
            name: 'InstaBook',
            link: 'https://github.com/SladeHirschi',
            image: require('../../assets/instabook.png'),
            description: `
                This is my social media Instagram/Facebook
                clone made using Swift (still in progress no Repo)`
        },
        {
            name: 'Kotlin API App',
            link: 'https://github.com/SladeHirschi',
            image: require('../../assets/kotlinAPI.png'),
            description: `
                This is a project written in Kotlin using 
                recycler views and a Brawl Starts API to display
                information in a list to users.`
        }
    ];

    useEffect(() => {
        setProjects(fakeProjectsData)
    }, [])

    return (
        <div className="w-100 h-100 projects-container">
            <h3>My Projects</h3>
            <hr />
            <div className='projects-grid'>
                {projects.map((project, index) => {
                    return (
                        <div key={index} style={{ height: '100%', overflow: 'hidden' }}>
                            <OverlayTrigger
                                key={index}
                                placement={'top'}
                                overlay={
                                    <Tooltip>
                                        {project.description}
                                    </Tooltip>
                                }
                            >
                                <a className="card card-box-shadow no-styles" href={project.link} target="_blank">
                                    <img className="card-img-top border" src={project.image} alt="Project Image" height={220} />
                                    <div className="card-body">
                                        <h5 className="card-title">{project.name}</h5>
                                    </div>
                                </a>
                            </OverlayTrigger>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Projects