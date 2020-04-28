import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header'
import {findTestWrapper} from '../../../../utils/testUtils'

describe("Header 组件", ()=>{
    it('样式渲染正常', ()=>{
        const wrapper = shallow(<Header />);
        expect(wrapper).toMatchSnapshot()
    })
    it('包括一个 input 框', ()=>{
     const wrapper = shallow(<Header />)
     const inputElem = findTestWrapper(wrapper, 'input');
     expect(inputElem.length).toBe(1)
    })
    
    it('input 框内容初始化为空', ()=>{
        const wrapper = shallow(<Header />)
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem.prop('value')).toEqual('')
       })
    
    it('input 框内容随着用户输入而变化', ()=>{
        const wrapper = shallow(<Header />)
        const inputElem = findTestWrapper(wrapper, 'input');
        const userInput = '今天要学习jest'
        inputElem.simulate('change', {
            target: {
                value: userInput
            }
        })
        expect(wrapper.state('value')).toEqual(userInput)
        /*
        const newInputElem = wrapper.find("[data-test='input']");
        expect(newInputElem.prop('value')).toBe(userInput)
        //必须要使用新的input，因为前者的状态没有改变（5-5 18min）
        */
       })
    
    it('input 框回车操作后，如果input没有内容，无操作', ()=>{
        const fn = jest.fn()
        const wrapper = shallow(<Header addUndoItem={fn}/>)
        const inputElem = findTestWrapper(wrapper, 'input');
        wrapper.setState({value:''})
        inputElem.simulate('keyUp', {
            keyCode: 13
        })
        expect(fn).not.toHaveBeenCalled()
       })
    
    it('input 框回车操作后，如果input有内容，函数应该被调用, 内容清空', ()=>{
        const fn = jest.fn()
        const wrapper = shallow(<Header addUndoItem={fn}/>)
        const inputElem = findTestWrapper(wrapper, 'input');
        const userInput = '学习 react'
        wrapper.setState({value: userInput})
        inputElem.simulate('keyUp', {
            keyCode: 13
        })
        expect(fn).toHaveBeenCalled()
        expect(fn).toHaveBeenLastCalledWith(userInput) //判断传入参数用的
        const newInputElem = findTestWrapper(wrapper, 'input');
        expect(newInputElem.prop('value')).toBe('')
       })
})



   /**
    * 1. 使用enzyme这个库中的simulate方法来模拟用户输入
    * 2. 使用wrapper.state()这个属性来替代this.state()中的那些属性
    * 3. 有两个测试方法，上面的是针对数据进行测试，在单元测试中比较好用，而在下面的注释部分中，是对dom进行测试。这种适合集成测试
    */