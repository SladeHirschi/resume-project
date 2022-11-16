import { useEffect, useState, FC, createRef } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineFundProjectionScreen, AiOutlinePicture, AiOutlinePlus } from "react-icons/ai";
import { NotificationManager } from 'react-notifications';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import parseJWT from "../helpers/fetch/jwt";
import defaultFetch from "../helpers/fetch/defaultFetch";
import { CreateProjectFetch, DeleteProjectFetch, UpdateProjectFetch } from "../helpers/fetch/componentFetches/profile";
import { BiTrash } from "react-icons/bi";

type Project = {
    id: number | null;
    name: string;
    link: string;
    image: string;
    description: string;
}

const emptyProject = {
    id: null,
    name: '',
    link: '',
    image: '',
    description: ''
};

const Projects: FC = () => {

    const [projects, setProjects] = useState<Array<Project>>([]);
    const [deleteIconIndex, setDeleteIconIndex] = useState<number | null>(null);
    const [projectDraft, setProjectDraft] = useState<Project>(emptyProject);

    const [showImageLoader, setShowImageLoader] = useState<boolean>(false);
    const [showProjectModal, setShowProjectModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const fileUploaderRef = createRef<HTMLInputElement>();

    const fakeProjectsData: Array<Project> = [
        {
            id: null,
            name: 'Artificial Intelligence',
            link: 'https://github.com/SladeHirschi/empire-agent',
            image: '',
            description: `
                This is a project that I made in an AI setting, 
                the intent was for an agent to establish itself
                in a game called wolfpack empire `
        },
        {
            id: null,
            name: 'Senior Project',
            link: 'https://github.com/SladeHirschi/senior_project',
            image: '',
            description: `
                This is my senior project made using 
                React Native and a Golang backend.
                The project was for users to keep 
                track of their spending`
        },
        {
            id: null,
            name: 'C++ Complex Fractals',
            link: 'https://github.com/SladeHirschi/OpenGLFractal',
            image: '',
            description: `
                This is my first c++ project using OOP,
                classes and inheritance to set pixels
                on an image to create fractal images`
        },
        {
            id: null,
            name: 'Python Server',
            link: 'https://github.com/SladeHirschi/PythonServer',
            image: '',
            description: `
                My first ever web server, written in
                python with a very minimal javascript
                frontend. We learned how to organize
                a server to handle requests and store sessions`
        },
        {
            id: null,
            name: 'Costco Database',
            link: 'https://github.com/SladeHirschi/databases-final',
            image: '',
            description: `
                This is an example of a multi table SQL
                database with foreign keys and constraints
                to connect data and keep it consistent`
        },
        {
            id: null,
            name: 'InstaBook',
            link: 'https://github.com/SladeHirschi',
            image: '',
            description: `
                This is my social media Instagram/Facebook
                clone made using Swift (still in progress no Repo)`
        },
        {
            id: null,
            name: 'Kotlin API App',
            link: 'https://github.com/SladeHirschi',
            image: '',
            description: `
                This is a project written in Kotlin using 
                recycler views and a Brawl Starts API to display
                information in a list to users.`
        }
    ];

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        setLoading(true);

        const getProjects = async (): Promise<void> => {
            const response: any = await defaultFetch('/getProjects?userId=' + parseJWT(sessionStorage.jwt).userId, { method: 'GET' });
            var projectsReponse = await response.json();
            setProjects(projectsReponse.projects);
        }

        await getProjects();
        await setLoading(false);
    }

    const uploadFile = async (e: any) => {
        e.stopPropagation();
        setShowImageLoader(true);
        if (!fileUploaderRef?.current?.files || !fileUploaderRef.current.files[0]) {
            alert("invalid file");
            return;
        }
        var formData = new FormData();
        formData.append("profilePicture", fileUploaderRef.current.files[0]);
        const response = await fetch(process.env.REACT_APP_BASE_URL + '/upload?userId=' + parseJWT(sessionStorage.jwt).userId + '&table=projects', {
            method: 'POST',
            body: formData
        })
        var uploadResponse = await response.json();
        setProjectDraft({ ...projectDraft, id: uploadResponse.insertedId, image: uploadResponse.url });
        setShowImageLoader(false);
    }

    const openFileExplorer = () => {
        fileUploaderRef?.current?.click();
    }

    function onChangeDraft(e: any): void {
        setProjectDraft({ ...projectDraft, [e.target.name]: e.target.value });
    }


    const submitNewProject = async () => {
        setLoading(true);
        if (projectDraft.id) {
            updateProject();
        } else {
            createNewProject();
        }
        await getData();
        await setShowProjectModal(false);
        await setProjectDraft(emptyProject);
        setShowImageLoader(false);
        setLoading(false);
    }

    const updateProject = async () => {
        var params = [
            { key: 'name', value: projectDraft.name },
            { key: 'link', value: projectDraft.link },
            { key: 'description', value: projectDraft.description },
            { key: 'publicURL', value: projectDraft.image},
        ]
        var response = await UpdateProjectFetch(params, projectDraft.id!);
        NotificationManager.success("Project Updated Successfully", "Success", 3000)
    }

    const createNewProject = async () => {
        var params = [
            { key: 'name', value: projectDraft.name },
            { key: 'link', value: projectDraft.link },
            { key: 'description', value: projectDraft.description },
            { key: 'publicURL', value: projectDraft.image},
        ]
        var response = await CreateProjectFetch(params);
        NotificationManager.success("Project Added Successfully", "Success", 3000)
    }

    const deleteProject = async (e: any, id: number) => {
        setLoading(true);
        e.stopPropagation();
        e.preventDefault();
        var response = await DeleteProjectFetch(id);
        await getData();
        await setLoading(false);
        NotificationManager.success("Project Deleted Successfully", "Success", 3000)
    }

    if (loading) {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                <div className='spinner'></div>
            </div>
        );
    }

    return (
        <div className="w-100 h-100 projects-container d-flex flex-column">
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h3>Projects</h3>
                <button
                    className='btn btn-primary d-flex align-items-center justify-content-between mb-2'
                    onClick={() => setShowProjectModal(true)}
                >
                    <span>Add Project</span>
                    <AiOutlinePlus style={{ marginLeft: '0.25rem' }} />
                </button>
            </div>
            <hr />
            {projects.length > 0 ?

                <div className='projects-grid'>
                    {projects.map((project, index) => {
                        return (
                            <div 
                                key={index} 
                                style={{ height: '100%', overflow: 'visible' }} 
                                onMouseEnter={() => setDeleteIconIndex(index)} 
                                onMouseLeave={() => setDeleteIconIndex(null)} 
                            >
                                <OverlayTrigger
                                    key={index}
                                    placement={'top'}
                                    overlay={
                                        (deleteIconIndex != null ? <Tooltip>
                                            {project.description}
                                        </Tooltip> : <div></div>)
                                    }
                                >
                                    <a className={"card no-styles" + (deleteIconIndex !== index ? '' : ' card-box-shadow')} href={project.link} target="_blank" style={{position: 'relative', overflow: 'visible'}}>
                                        {(deleteIconIndex == index) && <div style={{position: 'absolute', top: 0, left: 'calc(100% - 1.5rem)', width: '2.5rem', overflow: 'visible'}}>
                                            <div 
                                                style={{backgroundColor: 'rgb(223, 71, 89, 0.6)', borderRadius: '50%', padding: '0.5rem'}} 
                                                className='d-flex justify-content-center header-home'
                                                onClick={(e) => deleteProject(e, project.id!)}
                                            >
                                                <BiTrash color={'black'} />
                                            </div>
                                        </div>}
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
                :
                <div className='w-100 d-flex flex-column justify-content-center align-items-center' style={{ flexGrow: 1 }}>
                    <AiOutlineFundProjectionScreen size={200} color={'lightgray'} />
                    <p className='h3' style={{ color: 'lightgray' }}>No Projects yet</p>
                </div>

            }
            <Modal show={showProjectModal} onHide={() => {setShowProjectModal(false); setProjectDraft(emptyProject); setShowImageLoader(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3'>
                        <input
                            name='profilePicture'
                            style={{ display: 'none' }}
                            ref={fileUploaderRef}
                            onChange={uploadFile}
                            type='file'>
                        </input>
                        {!showImageLoader ?
                            <div className='d-flex justify-content-center'>
                                <img
                                    className='profile-picture'
                                    onClick={openFileExplorer}
                                    src={projectDraft.image.length > 0 ? projectDraft.image : 'https://static.thenounproject.com/png/3322766-200.png'}
                                    width='75%'
                                    height='75%'
                                    alt="Me"
                                    style={{ borderRadius: 2, cursor: 'pointer' }}
                                />
                            </div>
                            :
                            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                <div className='spinner'></div>
                            </div>
                        }
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            className="form-control"
                            placeholder='Project Title'
                            name="name"
                            onChange={(e) => onChangeDraft(e)}
                            value={projectDraft.name}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows={3}
                            placeholder='I made the greatest app of all time'
                            onChange={(e) => onChangeDraft(e)}
                            value={projectDraft.description}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="hyperlink" className="form-label">Hyperlink</label>
                        <input
                            className="form-control"
                            placeholder='Project Hyperlink'
                            name="link"
                            onChange={(e) => onChangeDraft(e)}
                            value={projectDraft.link}
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowProjectModal(false); setProjectDraft(emptyProject); setShowImageLoader(false)}}>Close</Button>
                    <Button variant="primary" onClick={submitNewProject}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Projects
