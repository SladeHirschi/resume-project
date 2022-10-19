import { useEffect, useState, FC, Component } from "react";
import Select from 'react-select';
import { FixedSizeList as List } from "react-window";
import { HiPencil, HiTrash } from 'react-icons/hi';

import defaultFetch from "../helpers/fetch/defaultFetch";
import parseJWT from "../helpers/fetch/jwt";
import FolderModal from "../components/modals/FolderModal";
import { CreateCategoryFetch, CreateSkillFetch, DeleteCategoryFetch, DeleteSkillFetch, UpdateSkillFetch } from "../helpers/fetch/componentFetches/skills";

const Skills = () => {

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [removeLastSkill, setRemoveLastSkill] = useState(false);

    const [showFolderModal, setShowFolderModal] = useState(false);

    const height = 35;

    useEffect(() => {
        getSkillOptions();
        getCategories();
    }, [])

    async function fetchWithReload(callback) {
        setLoading(true);
        var params = await Array.prototype.slice.call(arguments, 1);
        var response = await callback.apply(this, params);
        await getCategories();
        setLoading(false);
        return response;
    }

    async function getCategories() {
        var response = await defaultFetch('/categories?userId=' + parseJWT(sessionStorage.jwt).userId, { method: 'GET' });
        var categories = await response.json();
        categories?.map(cat => { if (cat.skills == null) { cat.skills = [] } })
        setCategories(categories)
    }

    async function getSkillOptions() {
        setLoading(true);
        const getSkills = async () => {
            var response = await defaultFetch('/skills', { method: 'GET' });
            var lightcastSkills = await response.json();
            setSkills(lightcastSkills)
        }
        await getSkills();
        setLoading(false);
    }

    async function createSkill(skill) {
        var selectedCategory = getSelectedCategory();
        var params = [{key: 'label', value: skill.label}, {key: 'value', value: skill.value}, {key: 'categoryId', value: selectedCategory.id}]
        var response = await fetchWithReload(() => CreateSkillFetch(params));
    }

    async function updateSkill(skillId, categoryId, newSkill) {
        var params = [{key: 'label', value: newSkill.label}, {key: 'value', value: newSkill.value}]
        await fetchWithReload(() => UpdateSkillFetch(skillId, params));
    }

    async function deleteSkill(e, skillId) {
        e.stopPropagation();
        await fetchWithReload(() => DeleteSkillFetch(skillId));
    }

    async function createCategory() {
        var response = await fetchWithReload(() => CreateCategoryFetch(categoryName));
        setShowFolderModal(false);
        setCategoryName('');
    }

    async function deleteCategory(e, categoryId) {
        var response = await fetchWithReload(() => DeleteCategoryFetch(categoryId));
    }

    function getSelectedCategory() {
        var selectedCategory = categories.find(category => category.isSelected == true)
        return selectedCategory;
    }

    function getSkillBeingEdited() {
        var skill = categories?.map(cat => cat.skills.find(skill => skill.isEditing === true));
        return skill;
    }

    function selectCategory(e, categoryId) {
        e.stopPropagation()
        var tempCats = [...categories]
        var skill = { id: null, name: '' };
        var catToChange = tempCats.findIndex(cat => categoryId === cat.id);
        tempCats[catToChange].skills.push(skill);
        tempCats[catToChange].isSelected = true;
        setCategories(tempCats);
        setRemoveLastSkill(true);
    }

    function deselectCategoryAndSkill(e) {
        if (removeLastSkill) {
            deleteLastSkill();
        }
        var skillBeingEdited = getSkillBeingEdited();
        if (skillBeingEdited) {
            var tempCats = [...categories];
            tempCats.map(cat => cat.skills.map(skill => skill.isEditing = false));
            setCategories(tempCats);
        }
    }

    function deleteLastSkill() {
        var tempCats = [...categories]
        var catToChange = tempCats.findIndex(cat => cat.isSelected === true);
        if (catToChange == -1) {
            return;
        }
        tempCats[catToChange].skills.pop()
        tempCats[catToChange].isSelected = false;
        setCategories(tempCats);
        setRemoveLastSkill(false);
    }

    function editSkill(e, categoryId, skillId) {
        e.stopPropagation();
        var tempCats = [...categories]
        var catToChange = tempCats.findIndex(cat => categoryId == cat.id);
        var skillIndex = tempCats[catToChange].skills.findIndex(skill => skillId == skill.id);
        tempCats[catToChange].skills[skillIndex].isEditing = true;
        setCategories(tempCats);
    }

    function selectSkillOption(skillId, categoryId, skillOption) {
        if (skillId) {
            updateSkill(skillId, categoryId, skillOption)
        } else {
            createSkill(skillOption)
        }
    }

    class MenuList extends Component {
        render() {
            const { options, children, maxHeight, getValue } = this.props;
            const [value] = getValue();
            const initialOffset = options.indexOf(value) * height;

            return (
                <List
                    height={maxHeight}
                    itemCount={children.length}
                    itemSize={height}
                    initialScrollOffset={initialOffset}
                >
                    {({ index, style }) => <div style={style}>{children[index]}</div>}
                </List>
            );
        }
    }

    if (loading) {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                <div className='spinner'></div>
            </div>
        );
    }

    return (
        <div className="w-100 h-100 skills-container" onClick={deselectCategoryAndSkill}>
            <h3>Skills</h3>
            <hr />

            <div className='row d-flex justify-content-end mt-2 mb-2'>
                <button
                    className='btn btn-primary'
                    style={{ width: 'fit-content' }}
                    onClick={() => setShowFolderModal(true)}
                >
                    Create Skill Category
                </button>
            </div>

            <div className='row gy-5'>
                {categories?.map((category, index) => {
                    return (
                        <div key={index} className='col-md-4'>
                            <div className={"card card-box-shadow p-2" + (category.isSelected == true ? ' selected-card' : '')} onClick={(e) => selectCategory(e, category.id)}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div></div>
                                        <h5 className="card-title text-center">{category.name}</h5>
                                        <div className="d-flex">
                                            <HiTrash onClick={(e) => deleteCategory(e, category.id)} size={20} className='ms-1 header-home' />
                                        </div>
                                    </div>
                                    {category?.skills?.map((skill, index) => {
                                        return (
                                            <div key={index} className='text-align-center mb-2' onClick={(e) => e.stopPropagation()}>
                                                {skill.id && !skill.isEditing ?
                                                    <div>
                                                        <div className="d-flex">
                                                            <h5 style={{ flexGrow: 1 }}>{skill.label}</h5>
                                                            <HiPencil onClick={(e) => editSkill(e, category.id, skill.id)} size={20} className='ms-2 header-home' />
                                                            <HiTrash onClick={(e) => deleteSkill(e, skill.id)} size={20} className='ms-1 header-home' />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div style={{ flexGrow: 1 }}>
                                                        <Select
                                                            components={{ MenuList }}
                                                            options={skills}
                                                            onChange={(option) => selectSkillOption(skill.id, category.id, option)}
                                                            autoFocus={category.isSelected}
                                                            value={skills.find(skillOption => skillOption.value === skill.value)}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        );
                                    })}
                                    {!category.isSelected &&
                                        <div className='text-secondary'>Click to add</div>
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <FolderModal
                show={showFolderModal}
                onClose={() => setShowFolderModal(false)}
                onChangeName={setCategoryName}
                name={categoryName}
                onSubmit={createCategory}
            />
        </div>
    );
}

export default Skills