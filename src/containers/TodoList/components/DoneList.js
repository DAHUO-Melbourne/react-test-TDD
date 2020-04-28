import React, { Component } from 'react';
class UndoList extends Component {
    render(){
        const { list, deleteItem, changeStatus, handleBlur, valueChange, checkItem } = this.props
        return (
            <div className="undo-list">
                <div className="undo-list-title">
                    已经完成
                    <div data-test="count" className="undo-list-count">{list.length}</div>
                </div>
                <ul className="undo-list-content">
                    {
                        list.map((item, index)=>{
                        return (
                        <li
                         data-test="list-item"
                         key={index}
                         className="undo-list-item"
                         onClick={() => changeStatus(index)}
                         >
                             <input
                              type="checkbox"
                              className="undo-list-checkout"
                              data-test="checkbox"
                              checked='true'
                              onClick={(e)=>{
                                e.stopPropagation()
                                checkItem(index, e.target.checked)
                              }} />
                            {item.status==='div'?item.value:(
                                <input 
                                  className='undo-list-input'
                                  data-test="input" 
                                  value={item.value}
                                  onBlur={()=>{handleBlur(index)}}
                                  onChange={(e)=>{valueChange(index, e.target.value)}}/>
                            )}
                            <div
                             className="undo-list-delete"
                             data-test="delete-item" 
                             onClick={(e)=>{
                                 e.stopPropagation()
                                 deleteItem(index)}}
                             >-</div>
                        </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default UndoList;
