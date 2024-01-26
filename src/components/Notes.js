import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { FaTrash } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import img from '../images/notehub-logo.svg';
import CreatableSelect from 'react-select/creatable';
import { MdLightMode } from "react-icons/md";
import Select from 'react-select'

const Notes = () => {
    const [todo, setTodo] = useState("");
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const [newNoteModal, setNewNoteModal] = useState(false);
    const [viewNoteModal, setViewNoteModal] = useState(false);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [oldTags, setOldTags] = useState([]);
    const [inputText, setInputText] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const [darkMode, setDarkMode] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                onValue(ref(db, `${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map(todo => {
                            setTodos((oldArray) => [...oldArray, todo]);

                            const result = Object.values(data);
                            let temk = []
                            temk.push(result.map((item) => (item.tags)))
                            let myString = temk.toString()
                            let newArr = myString.split(',').map((item) => ({label: item, value: item}))

                            let pp = newArr.filter( (ele, ind) => ind === newArr.findIndex( elem => elem.label === ele.label && elem.value === ele.value && (ele.label).length > 0));
                            setOldTags(pp);
                            return null
                        })
                    }
                })
            } else if (!user) {
                navigate("/");
            }
            if (localStorage.getItem('dark-mode') === "false") {
                setDarkMode(false)
            } else {
                setDarkMode(true)
            }
        })
    }, [navigate]);

    function toggleDarkMode() {
        setDarkMode(!darkMode)
        if (darkMode) {
            localStorage.setItem('dark-mode', "false");
        } else {
            localStorage.setItem('dark-mode', "true");
        }
    }

    const handleSignOut = () => {
        signOut(auth).then((then) => {
            navigate("/");
        }).catch((err) => {
            alert(err.message);
        });
    };

    const writeToDatabase = () => {
        const uidd = uid();
        let tagsToAdd = "";
        if (tags.length < 1) {
            tagsToAdd = null;
        } else {
            tagsToAdd = tags.map((item) => item.label).toString()
        }
        set(ref(db, `${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            text: text,
            tags: tagsToAdd,
            uidd: uidd,
        });
        setTodo("");
        setText("");
        setNewTag("");
        setNewNoteModal(false);
    }

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };
    
    const handleOpenNote = (todo) => {
        setViewNoteModal(true);
        if (todo.tags === undefined) {
            setText(todo.text);
            setTempUidd(todo.uidd);
            setTodo(todo.todo);
        } else {
            let newArr = todo.tags.split(',').map((item) => ({label: item, value: item}))
            setTags(newArr)
            setText(todo.text);
            setTempUidd(todo.uidd);
            setTodo(todo.todo);
        }
    }

    const handleUpdate = () => {
        setIsEdit(true);
    };

    const handleEditConfirm = () => {
        let tagsToAdd = "";
        if (tags.length < 1) {
            tagsToAdd = null;
        } else {
            tagsToAdd = tags.map((item) => item.label).toString()
        }
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            text: text,
            tags: tagsToAdd,
            tempUidd: tempUidd,
        });
        setTodo("");
        setText("");
        setNewTag("");
        setIsEdit(false)
        setViewNoteModal(false);
    };

    const handleAddNewNote = () => {
        setNewNoteModal(true)
    };

    const handleNewTag = (e) => {
        setNewTag(e.target);
        setTags(e);
    };

    const StylesConfig = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', padding: '2px', border: '1px solid rgba(0,0,0, .3)', }),
        multiValue: (styles) => ({ ...styles, backgroundColor: 'rgba(37, 99, 235, 1)', border: 'none', padding: '1px', }),
        multiValueLabel: (styles) => ({ ...styles, color: 'white', fontWeight: '500', letterSpacing: '1px', border: '0px solid rgba(0,0,0, .3)',  }),
        multiValueRemove: (styles) => ({ ...styles, color: 'white', fontWeight: '700',  }),
    };

    const inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = todos.filter((el) => {
        //if no input the return the original
        if (filterTag !== '') {
            return el.tags.toLowerCase().includes(filterTag)
        } else if (inputText !== '') {
            return el.todo.toLowerCase().includes(inputText)
        }
        //return the item which contains the user input
        else {
            return el;
        }
    });

    const tagFilterHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.map((tag) => tag.label).toString().toLowerCase();
        setFilterTag(lowerCase);
    };

    const handleNoteModalClose = () => {
        setIsEdit(false);
        setTodo("");
        setTags([])
        setText("");
        setTempUidd("");
        setNewNoteModal(false)
        setViewNoteModal(false)
    }

  return (
    <div className={`pt-6 overflow-x-hidden min-h-screen ${darkMode ? "dark" : "light"}`}>
        <div className='max-w-6xl mx-auto '>
        <img src={img} alt='' className='-mb-2 cursor-pointer hover:scale-105 duration-300 ease-in-out pl-4' onClick={() => navigate("/")} />
        <div className='flex justify-between items-baseline px-4'>
            <h1 className='text-6xl font-semibold'>Notes</h1>
            <div className='flex gap-2'>
                <button className='hover:scale-125 duration-300 ease-in-out w-10 h-10 flex items-center justify-center text-3xl' onClick={handleAddNewNote}><IoMdAdd /></button>
                <button className='hover:scale-125 duration-300 ease-in-out w-10 h-10 flex items-center justify-center text-2xl' onClick={toggleDarkMode}>{darkMode ? <MdLightMode /> : <MdDarkMode />}</button>
                <button className='hover:scale-125 duration-300 ease-in-out w-10 h-10 flex items-center justify-center  text-2xl' onClick={handleSignOut}><FaSignOutAlt /></button>
            </div>
        </div>
        <div className='px-4 flex pt-4 gap-2 items-center'>
            <div className='flex-1'>
                <h2 className='text-lg text-start pb-1'>Title</h2>
                <input type='text' placeholder='Search...' className='p-2 rounded w-full border text-black border-black outline-2 outline-blue-500 border-opacity-30' onChange={inputHandler} />
            </div>
            <div className='w-1/2 md:w-1/3'>
                <h2 className='text-lg text-start pb-1'>Tags</h2>
                <Select options={oldTags} styles={StylesConfig} isMulti className='text-start' onChange={tagFilterHandler} />
            </div>
        </div>
        <div className='pb-20'>
            <ul className='flex flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4'>
            {filteredData.map((todo, i) => (
                <li key={i} className={`${darkMode ? "dark" : "light"} relative shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] min-w-[300px] h-full border border-opacity-25 border-black hover:cursor-pointer hover:scale-105 duration-300 ease-in-out w-full flex flex-col justify-between rounded-lg text-start`}>
                    <div className='p-4' onClick={() => handleOpenNote(todo)}>
                        <h1 className='text-xl'>{(todo.todo).substring(0, 20)}{((todo.todo).length > 20) ? "..." : ""}</h1>
                        <p className='text-gray-500'>{(todo.text).substring(0, 100)}{((todo.text).length > 100) ? "..." : ""}</p>
                    </div>
                    <div className='flex justify-between flex-wrap pt-4 max-w-58 p-4' onClick={() => handleOpenNote(todo)}>
                        <ul className='flex flex-wrap-reverse gap-1 text-white font-semibold max-w-48'>
                            {todo.tags ?
                                <>
                                    {todo.tags.split(",").map((tag, i) => <li key={i} className='bg-blue-600 px-1 rounded'>{tag}</li>)}
                                </>
                                :
                                ""
                            }
                            
                        </ul>
                        
                    </div>
                    <div className='flex gap-4 justify-end p-5 absolute bottom-0 right-0'>
                            <button onClick={() => handleDelete(todo.uidd)}><FaTrash /></button>
                    </div>
                </li>
            ))}
            </ul>
        </div>
        <div className={newNoteModal ? `bg-white bg-opacity-100 flex justify-center overflow-x-hidden items-center w-screen h-screen top-0 left-0 absolute px-5 ${darkMode ? "dark" : "light"}` : 'hidden'}>
          <div className='shadow-[rgba(0,_0,_0,_0.3)_0px_0px_50px] border border-opacity-25 border-black max-w-4xl w-full h-fit p-6 flex flex-col gap-4 rounded-lg text-start'>
            <h1 className='text-xl'>Add new note</h1>
            <div className='w-full'>
                <h2 className='text-lg pb-1'>Title</h2>
                <input type='text' className='p-2 rounded w-full text-black outline-blue-500 border border-opacity-25 border-black' value={todo} onChange={(e) => setTodo(e.target.value)} />
            </div>
            <div className='w-full'>
                <h2 className='text-lg pb-1'>Body</h2>
                <textarea type='text' className='p-2 w-full outline-blue-500 text-black rounded border border-opacity-25 border-black min-h-[200px] max-h-[50vh]' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='w-full'>
                <h2 className='text-lg pb-1'>Tags</h2>
                <CreatableSelect isMulti options={oldTags} styles={StylesConfig} onChange={handleNewTag} value={newTag} />
            </div>
                <div className='flex gap-4 justify-end'>
                    <div className='flex gap-2'>
                        <button className='bg-gray-500 px-4 text-white py-2 rounded text-xl' onClick={handleNoteModalClose}>Close</button>
                        <button className='bg-blue-600 px-4 text-white py-2 rounded text-xl' onClick={writeToDatabase}>Add</button>
                    </div>
                </div>
            </div>  
        </div>

        <div className={viewNoteModal ? `${darkMode ? "dark" : "light"} bg-white bg-opacity-100 flex justify-center overflow-x-hidden items-center w-screen h-screen top-0 left-0 absolute px-5` : 'hidden'}>
          <div className={`${darkMode ? "dark" : "light"} bg-white shadow-[rgba(0,_0,_0,_0.3)_0px_0px_50px] border border-opacity-25 border-black max-w-4xl w-full h-fit p-6 flex flex-col gap-0 rounded-lg text-start`}>
                <h1 className='text-xl font-semibold'>{isEdit ? "Edit note" : todo}</h1>
            <div className='w-full'>
                <h2 className={isEdit ? 'text-lg pb-1 pt-4' : "hidden"}>Title</h2>
                {isEdit ? 
                    <input type='text' className='p-2 rounded text-black w-full outline-blue-500 border border-opacity-25 border-black' value={todo} onChange={(e) => setTodo(e.target.value)} />
                    :
                    ""
                }
            </div>
            <div className='w-full'>
                <h2 className={isEdit ? 'text-lg pb-1 pt-4' : "hidden"}>Body</h2>
                {isEdit ? 
                    <div>
                        <textarea type='text' className='p-2 w-full text-black outline-blue-500 rounded border border-opacity-25 border-black min-h-[200px] max-h-[50vh]' value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    :
                    <p className='pb-10'>{text}</p>
                }
            </div>
            <div className='w-full'>
                <h2 className={tags.length < 1 ? 'hidden' : 'text-lg pb-1 pt-4'}>Tags</h2>
                <ul className={isEdit ? "hidden" : "flex gap-1"}>
                    {tags.map((tag, i) => <li key={i} className='bg-blue-600 text-white px-3 py-0.5 w-fit rounded'>{tag.value}</li>)}
                </ul>
                <CreatableSelect isMulti options={oldTags} styles={StylesConfig} onChange={handleNewTag} value={tags} className={isEdit ? "block" : 'hidden'} />
            </div>
                <div className='flex gap-4 justify-end pt-4'>
                    <div className='flex gap-2'>
                        {isEdit ? 
                            <div className='flex gap-2'>
                                <button className='bg-gray-500 px-4 text-white py-2 rounded text-xl' onClick={handleNoteModalClose}>Close</button>
                                <button className='bg-blue-600 px-4 text-white py-2 rounded text-xl' onClick={handleEditConfirm}>confirm</button>
                            </div>
                            :
                            <div className='flex gap-2'>
                                <button className='bg-gray-500 px-4 text-white py-2 rounded text-xl' onClick={handleNoteModalClose}>Close</button>
                                <button className='bg-blue-600 px-4 text-white py-2 rounded text-xl' onClick={handleUpdate}>Edit</button>
                            </div>
                        }
                    </div>
                </div>
            </div>  
        </div>
        
    </div>
    </div>
  )
}

export default Notes