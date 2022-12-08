import React ,{useEffect, useState} from 'react';

// get data from  list
const getLocalItems = () => {
  let list = localStorage.getItem('lists')
  
 console.log(list)
  if(list){
     return JSON.parse(localStorage.getItem('lists'))
  } else{
    return [];
  }
}


const Todo = () => {
  const [inputData, setInputData] =useState("");
  const[item,setItem]=useState(getLocalItems());

  const [toggleBtn,setToggleBtn]= useState(true);
  const [editBtn, setEditBtn] = useState(null);

  
  
  // add item

  const addItem = () =>{
    if(!inputData){
      alert('please fill data');
    }else if(inputData  && !toggleBtn){
      setItem (
        item.map((element)=>{
           if(element.id === editBtn){
            return {...element, name:inputData}
           }
           return element;
        })
      )
     setToggleBtn(true);

     setInputData('');
     setEditBtn(null);
      
    }
    else{

    const allinputData = {id: new Date().toString(), name:inputData}
     setItem([...item, allinputData]) 
     setInputData('')
    }
  }
  // delete item

  const deleteItem = (index) => {
    
    const updateItem = item.filter((element)=>{
            return index != element.id;
    })
     setItem(updateItem)
  }
  
  //remove all
  const removeAll = () => {
    setItem([]);
  }
  // edid item
  const editItem = (id) => {
     let newEditItem = item.find((element)=>{
        return element.id == id
     })
     console.log(newEditItem);
     setToggleBtn(false);

     setInputData(newEditItem.name);
     setEditBtn(id);

  }
  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(item))
  },[item])
  return (
        <>
          <div className='main-div'>
               
            <div className='child-div'>
                <figure>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Google_Calendar_icon_%282015-2020%29.svg/1051px-Google_Calendar_icon_%282015-2020%29.svg.png" className="image"alt="tudologo"></img>
                    <figcaption>Add Your list Here </figcaption>
                </figure>

                <div className='addItem'>
                    <input type="text" placeholder='write Add item' className="input" value={inputData}
                    onChange={(e)=>setInputData(e.target.value)}></input>
                     {
                       toggleBtn ? <i className="fa-solid fa-plus add-btn"title="Add Item" id="logo" onClick={addItem}></i> :
                       <i className="far fa-edit add-btn"title="update Item" id="logo" onClick={addItem}></i>
                     }
                </div>

               
                  {
                    item.map((element) => {
                      return (
                        <>
                         <div className="addItem" key={element.id}>
                        <div className ="eachItems">
                         <h3>{element.name}</h3>
                       
                        </div>
                         <div className="edit">
                         <i className="far fa-edit  add-btn" id="logo" classNmae="edit2" title="Edit Item" onClick={() =>editItem(element.id)}></i>
                         </div>
                        <i className="far fa-trash-alt add-btn"  id="logo" title="Delete Item" onClick={() =>deleteItem(element.id)}></i>
                        </div>
                        </>
                      )
                    })
                  }
                

                <div className="showItem">
                  <button className="btn" onClick={removeAll}><span>Remove All</span></button>
                </div>
                <div className="text">
                  <h3> TodoChat created by @rohit kumar</h3>
                </div>
            </div>
          </div>
        </>
  )
}

export default Todo
