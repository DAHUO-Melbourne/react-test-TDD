import React from 'react';
import App from './App';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

it('renders without crashing', ()=>{
  /*
  const div = document.createElement('div')
  const container = div.getElementsByClassName('App');
  expect(container.length).toBe(2)
  */
 const wrapper = shallow(<App />)
 console.log(wrapper.debug())
 const container = wrapper.find('[data-test="container"]')
 expect(wrapper.find('[data-test="container"]').length).toBe(1)
 expect(wrapper.find('[data-test="container"]').prop('title')).toBe('Da Huo')
 expect(container).toExist()
 expect(container).toHaveProp('title', 'Da Huo')

 const wrapperAnother = mount(<App />)
 expect(wrapperAnother).toMatchSnapshot();
})

/**
 * Enzyme其实就是对ReactDom进行一些封装，提供了一些测试方法，使测试变得更加灵活，所以这个很合适
 * 一. shallow: 浅复制,浅渲染。意思就是说对App内部的组件就是用一个简单的标记代替就可以了。所以只对最外层的层级做测试，里面的底层层级就不关注了
 *    1. 本身只对这一个组件进行单元测试，用shallow做组件的浅渲染就很合适了
 *    2. enzyme的相关资料：https://github.com/enzymejs/enzyme ； https://enzymejs.github.io/enzyme/
 *    3. wrapper.find()里面放上和jquery规则相同的选择符可以进行那个组件
 *    4. wrapper.find().prop('')可以用来测试其他参数的
 *    5. console.log(wrapper.debug())可以打印出你浅渲染的结果，方便你debug
 *    6. toExist()是jest-enzyme的一个函数，可以替代.length.toBe(1)，安装语句为：npm install jest-enzyme --save-dev，然后需要在jest.config.js文件中添加初始化代码
 *    7. shallow是浅渲染，mount是深渲染，所有的子组件全部可以渲染出来
 * 二. mount: 深复制深渲染，对自组件也一起复制，一般用于集成测试而非单元测试
 * 三. snapshot一般用于那些内容比较敏感轻易不会修改的组件
 */
