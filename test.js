import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Stars from './client/components/stars.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('', () => {
  const wrapper = shallow(<Stars/>);
  expect(wrapper.exists()).toBe(true);
});