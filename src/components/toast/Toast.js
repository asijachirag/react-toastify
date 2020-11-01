import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Toast.css';

const Toast = props => {
    const { toastList, position } = props;
    
    const [list, setList] = useState(toastList);
  
    const secondlist=[];
    for(let element of toastList)
    {
        let toastitem={
         id:element.id,
         second:0,
         flag:true,   
        };
        secondlist.push(toastitem);
    }
    const [seconds, setSeconds] = useState(0);
   

    useEffect(() => {
        const interval = setInterval(() => {
            if ( toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, 4000);
        
        return () => {
            clearInterval(interval);
        }
    }, [toastList, list]);

    const hoverToast=(id) => {
        let secondlistItemindex = secondlist.findIndex(e => e.id === id);
        secondlist[secondlistItemindex].flag=false;
    }
    const continueToast=async(id) => {
        let secondlistItemindex = secondlist.findIndex(e => e.id === id);
        console.log(secondlist[secondlistItemindex].id);
        console.log(secondlist[secondlistItemindex].second);
        console.log(secondlist[secondlistItemindex].flag);
        if(secondlist[secondlistItemindex].flag==true)
        {
            await setInterval(() => {
                if(secondlist[secondlistItemindex].flag==true)
                {
                    secondlist[secondlistItemindex].second+=1;
                    if(secondlist[secondlistItemindex].second==4)
                    {
                        deleteToast(secondlist[secondlistItemindex].id);   
                    }
                }
              }, 1000);   
        }
    };
    const leaveToast=(id)=>{
        let secondlistItemindex = secondlist.findIndex(e => e.id === id);
        secondlist[secondlistItemindex].flag=true;
        continueToast(id);
    }
    
    const deleteallToast= () =>{
        list.splice(0, list.length);
        toastList.splice(0,toastList.length);
        setList([...list]);
    }
    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        console.log(listItemIndex);
        console.log(toastListItem);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor,color:toast.color }}
                            onMouseEnter={()=>hoverToast(toast.id)}
                            onMouseLeave={()=>leaveToast(toast.id)}
                            onLoad={() => continueToast(toast.id)}
                            
                        >
                            <button onClick={() => deleteToast(toast.id)}  style={{ color:toast.button_color }}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.string,
    dismissTime: PropTypes.number
}

export default Toast;
