import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../../index'

Enzyme.configure({ adapter: new Adapter() });
it('TodoList 初始化列表为空', () => {
    const wrapper = shallow( <TodoList /> )
    expect(wrapper.state('undoList')).toEqual([])
})

it('TodoList 应该给 Header 传递一个增加undoList内容的方法', () => {
    const wrapper = shallow( <TodoList /> )
    const Header = wrapper.find('Header')
    expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem)
})
/**
 * 1. TodoList中有一个自元素，叫<Header />，所以用find可以找到这个元素
 * 2. 这个元素中有一个prop是上层传递下来的函数，叫addUndoItem。他的内容应该等于wrapper实例的addUndoItem方法
 *    也就是说，传递接收到的参数中的函数 = 父组件实例中的函数
 */

it('当Header 回车的时候，undoList应该增加内容', () => {
    const wrapper = shallow( <TodoList /> )
    const Header = wrapper.find('Header')
    const addFunc = Header.prop('addUndoItem')
    const inputValue = '学习 React'
    addFunc(inputValue)
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe(inputValue)
    addFunc('学习 React2')
    expect(wrapper.state('undoList').length).toBe(2)
})
/**
 * 应该尽可能将header与todoList解耦，所以不要尝试模拟header的回车方法，而是直接调用回车之后会触发的方法
 * 
 */