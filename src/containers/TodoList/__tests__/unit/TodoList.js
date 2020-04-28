import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index'

describe('TodoList 组件', ()=>{
    it('组件初始化列表为空', () => {
        const wrapper = shallow( <TodoList /> )
        expect(wrapper.state('undoList')).toEqual([])
    })
    
    it('组件应该给 Header 传递一个增加undoList内容的方法', () => {
        const wrapper = shallow( <TodoList /> )
        const Header = wrapper.find('Header')
        expect(Header.prop('addUndoItem')).toBeTruthy()
    })
    /**
     * 1. TodoList中有一个自元素，叫<Header />，所以用find可以找到这个元素
     * 2. 这个元素中有一个prop是上层传递下来的函数，叫addUndoItem。他的内容应该等于wrapper实例的addUndoItem方法
     *    也就是说，传递接收到的参数中的函数 = 父组件实例中的函数
     */
    
    it('addUndoItem被执行的时候，undoList应该增加内容', () => {
        const wrapper = shallow( <TodoList /> )
        const { addUndoItem } = wrapper.instance()
        const inputValue = '学习 React'
        addUndoItem(inputValue)
        expect(wrapper.state('undoList').length).toBe(1)
        expect(wrapper.state('undoList')[0]).toBe(inputValue)
        addUndoItem('学习 React2')
        expect(wrapper.state('undoList').length).toBe(2)
    })
    /**
     * 应该尽可能将header与todoList解耦，所以不要尝试模拟header的回车方法，而是直接调用回车之后会触发的方法
     * 
     */
    
    it('组件应该给 Header 传递一个增加undoList内容的方法', () => {
        const wrapper = shallow( <TodoList /> )
        const UndoList = wrapper.find('UndoList')
        expect(UndoList.prop('list')).toBeTruthy()
        expect(UndoList.prop('deleteItem')).toBeTruthy()
    })
    
    it('当delete方法被执行的时候，undoList应该删除内容', () => {
        const wrapper = shallow( <TodoList /> )
        const data = ['学习 Jest', 'dell', 'lee']
        wrapper.setState({
            undoList: data
        })
        wrapper.instance().deleteItem(1)
        expect(wrapper.state('undoList')).toEqual([data[0], data[2]])
    })
    
    /**
     * 14min后面的refactor没加
     */
})

