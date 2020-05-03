import React, { Component } from 'react';
import Header from './components/Header'
import UndoList from './components/UndoList'
import DoneList from './components/DoneList'
import './style.css'
class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            undoList:[],
            doneList:[]
        }
        this.addUndoItem = this.addUndoItem.bind(this)
        this.deleteItem = this.deleteUndoItem.bind(this)
        this.deleteDoneItem = this.deleteDoneItem.bind(this)
        this.changeStatus = this.changeUndoStatus.bind(this)
        this.changeDoneStatus = this.changeDoneStatus.bind(this)
        this.handleBlur = this.handleUndoBlur.bind(this)
        this.handleDoneBlur = this.handleDoneBlur.bind(this)
        this.valueChange = this.valueUndoChange.bind(this)
        this.checkItem = this.checkUndoItem.bind(this)
        this.checkDoneItem = this.checkDoneItem.bind(this)
        this.valueDoneChange = this.valueDoneChange.bind(this)
    }
    addUndoItem(value){
        this.setState({
            undoList: [...this.state.undoList, {
                status:'div',
                value
            }]
        })
    }
    deleteUndoItem(index){
        const newList = [...this.state.undoList]
        newList.splice(index,1)
        this.setState({
            undoList: newList
        })
    }
    deleteDoneItem(index){
        const newList = [...this.state.doneList]
        newList.splice(index,1)
        this.setState({
            doneList: newList
        })
    }
    changeUndoStatus(index){
        const newList = this.state.undoList.map((item, listIndex) => {
            if(index===listIndex){
                return{
                    ...item,
                    status:'input'
                }
            }
            return{
                ...item,
                status:'div'
            }
        })
        this.setState({undoList: newList})
    }
    changeDoneStatus(index){
        const newList = this.state.doneList.map((item, listIndex) => {
            if(index===listIndex){
                return{
                    ...item,
                    status:'input'
                }
            }
            return{
                ...item,
                status:'div'
            }
        })
        this.setState({doneList: newList})
    }
    handleUndoBlur(index){
        const newList = this.state.undoList.map((item, listIndex) => {
            if(index===listIndex){
                return{
                    ...item,
                    status:'div'
                }
            }
            return item
        })
        this.setState({undoList: newList})
    }
    handleDoneBlur(index){
        const newList = this.state.doneList.map((item, listIndex) => {
            if(index===listIndex){
                return{
                    ...item,
                    status:'div'
                }
            }
            return item
        })
        this.setState({doneList: newList})
    }
    valueUndoChange(index, value){
        const newList = this.state.undoList.map((item, listIndex) => {
            if(index===listIndex){
                return{
                    ...item,
                    value
                }
            }
            return item
        })
        this.setState({undoList: newList})   
    }
    valueDoneChange(index, value){
        const newList = this.state.doneList.map((item, listIndex) => {
            if(index===listIndex){
                return{
                    ...item,
                    value
                }
            }
            return item
        })
        this.setState({doneList: newList})   
    }
    checkUndoItem(index, checked){
        const newList = this.state.doneList
        this.state.undoList.map((item, listIndex)=>{
            if(index===listIndex&&checked){
                newList.push(item)        
            }
            return newList
        })
        this.setState({doneList: newList})
        const newUndoList = [...this.state.undoList]
        newUndoList.splice(index,1)
        this.setState({
            undoList: newUndoList
        })
    }
    checkDoneItem(index){
        const newList = this.state.undoList
        this.state.doneList.map((item, listIndex)=>{
            if(index===listIndex){
                newList.push(item)        
            }
            return newList
        })
        this.setState({undoList: newList})
        const newUndoList = [...this.state.doneList]
        newUndoList.splice(index,1)
        this.setState({
            doneList: newUndoList
        })
    }
    render(){
        const { undoList, doneList } = this.state
        return (
            <div>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList
                 list={undoList} 
                 deleteItem={this.deleteItem}
                 changeStatus={this.changeStatus}
                 handleBlur={this.handleBlur}
                 valueChange={this.valueChange}
                 checkItem={this.checkItem}/>
                <DoneList
                 list={doneList} 
                 deleteItem={this.deleteDoneItem}
                 changeStatus={this.changeDoneStatus}
                 handleBlur={this.handleDoneBlur}
                 valueChange={this.valueDoneChange}
                 checkItem={this.checkDoneItem}/>
            </div>
        )
    }
}


export default TodoList;
