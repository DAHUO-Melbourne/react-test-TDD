import React from 'react';
import {shallow} from 'enzyme';
import UndoList from '../../components/UndoList'
import {findTestWrapper} from '../../../../utils/testUtils'

describe('UndoList 组件', ()=>{
    it('当数据为空数组时, count 数目为0, 列表无内容', ()=>{
        const wrapper = shallow(<UndoList list={[]}/>);
        const countElem = findTestWrapper(wrapper, "count")
        const listItems = findTestWrapper(wrapper, "list-item")
        expect(countElem.text()).toEqual("0")
        expect(listItems.length).toEqual(0)
    })
    
    it('当数据不为空数组时, count 数目显示数组长度, 列表不为空', ()=>{
        const listData = ['学习jest', '学习TDD', '学习单元测试']
        const wrapper = shallow(<UndoList list={listData}/>);
        const countElem = findTestWrapper(wrapper, "count")
        const listItems = findTestWrapper(wrapper, "list-item")
        expect(countElem.text()).toEqual("3")
        expect(listItems.length).toEqual(3)
    })
    
    it('当数据不为空数组时, 每一项都存在删除按钮', ()=>{
        const listData = ['学习jest', '学习TDD', '学习单元测试']
        const wrapper = shallow(<UndoList list={listData}/>);
        const deleteItems = findTestWrapper(wrapper, "delete-item")
        expect(deleteItems.length).toEqual(3)
    })
    
    it('当数据不为空数组时, 点击某个删除按钮, 会调用删除函数', ()=>{
        const listData = ['学习jest', '学习TDD', '学习单元测试']
        const fn = jest.fn()
        const index = 1
        const wrapper = shallow(<UndoList deleteItem={fn} list={listData}/>);
        const deleteItems = findTestWrapper(wrapper, "delete-item")
        deleteItems.at(index).simulate('click')
        expect(fn).toHaveBeenCalledWith(index)
    })
})