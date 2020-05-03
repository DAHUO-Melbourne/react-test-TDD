import React from 'react';
import {shallow} from 'enzyme';
import DoneList from '../../components/DoneList'
import {findTestWrapper} from '../../../../utils/testUtils'

describe('DoneList 组件', ()=>{
    it('样式渲染正常', ()=>{
        const wrapper = shallow(<DoneList list={[]}/>);
        expect(wrapper).toMatchSnapshot()
    })

    it('当数据为空数组时, count 数目为0, 列表无内容', ()=>{
        const wrapper = shallow(<DoneList list={[]}/>);
        const countElem = findTestWrapper(wrapper, "done-count")
        const listItems = findTestWrapper(wrapper, "done-list-item")
        expect(countElem.text()).toEqual("0")
        expect(listItems.length).toEqual(0)
    })

    it('当数据不为空数组时, count 数目显示数组长度, 列表不为空', ()=>{
        const listData = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const wrapper = shallow(<DoneList list={listData}/>);
        const countElem = findTestWrapper(wrapper, "done-count")
        const listItems = findTestWrapper(wrapper, "done-list-item")
        expect(countElem.text()).toEqual("3")
        expect(listItems.length).toEqual(3)
    })

    it('当数据不为空数组时, 每一项都存在删除按钮', ()=>{
        const listData = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const wrapper = shallow(<DoneList list={listData}/>);
        const deleteItems = findTestWrapper(wrapper, "done-delete-item")
        expect(deleteItems.length).toEqual(3)
    })

    it('当数据不为空数组时, 点击某个删除按钮, 会调用删除函数', ()=>{
        const listData = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const index = 1
        const wrapper = shallow(<DoneList deleteItem={fn} list={listData}/>);
        const deleteItems = findTestWrapper(wrapper, "done-delete-item")
        deleteItems.at(index).simulate('click', {
            stopPropagation: ()=>{}
        })
        expect(fn).toHaveBeenCalledWith(index)
    })

    it('当某一项被点击时，触发 changeStatus 函数', ()=>{
        const listData = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const index = 1
        const wrapper = shallow(<DoneList changeStatus={fn} list={listData}/>);
        const deleteItems = findTestWrapper(wrapper, "done-list-item")
        deleteItems.at(index).simulate('click')
        expect(fn).toHaveBeenCalledWith(index)
    })

    it('当某一项状态被设置为input时，展示输入框', ()=>{
        const listData = [{
            status: 'input',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const wrapper = shallow(<DoneList list={listData}/>);
        const inputItems = findTestWrapper(wrapper, "done-input")
        expect(inputItems.length).toBe(1)
    })

    it('当某一项input失去焦点时，触发handleBlur方法', ()=>{
        const listData = [{
            status: 'input',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const index = 0
        const wrapper = shallow(<DoneList handleBlur={fn} list={listData}/>);
        const inputElem = findTestWrapper(wrapper, "done-input")
        inputElem.simulate('blur')
        expect(fn).toHaveBeenCalledWith(index)
    })

    it('当某一项input变更时，触发 valueChange 方法', ()=>{
        const listData = [{
            status: 'input',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const index = 0
        const wrapper = shallow(<DoneList valueChange={fn} list={listData}/>);
        const inputElem = findTestWrapper(wrapper, "done-input")
        inputElem.simulate('change', {
            target: {value: '学习TDD'}
        })
        expect(fn).toHaveBeenCalledWith(index, '学习TDD')
    })
})