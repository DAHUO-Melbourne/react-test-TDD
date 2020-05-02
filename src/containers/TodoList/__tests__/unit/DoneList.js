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
})