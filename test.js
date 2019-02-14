import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './client/components/form-top.jsx';
import FormBot from './client/components/form-bot.jsx';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('testing Stars component', () => {
  var state = {
    stars: 4,
    reviews: 400,
    nightlyPrice: 50
  }
  
  test('should have 6 spans', () => {
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('span')).toHaveLength(6);
  })

  test('should have 4 full (.fas) stars and 1 empty (.far) star', () => {
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(4);
    expect(wrapper.find('.far.fa-star')).toHaveLength(1);
  });

  test('should have render a half star if star has a decimal between .25 and .75', () => {
    state.stars = 3.25;
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(3);
    expect(wrapper.find('.fas.fa-star-half-alt')).toHaveLength(1);
    expect(wrapper.find('.far.fa-star')).toHaveLength(1);

    state.stars = 3.75;
    const wrap = mount(<Header info={state} />);
    expect(wrap.find('.fas.fa-star')).toHaveLength(3);
    expect(wrap.find('.fas.fa-star-half-alt')).toHaveLength(1);
    expect(wrap.find('.far.fa-star')).toHaveLength(1);
  });

  test('should render a full star for decimal above .75', () => {
    state.stars = 3.8;
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(4);
    expect(wrapper.find('.fas.fa-star-half-alt')).toHaveLength(0);
    expect(wrapper.find('.far.fa-star')).toHaveLength(1);
  });

  test('should render a full star for decimal below .25', () => {
    state.stars = 3.24;
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(3);
    expect(wrapper.find('.fas.fa-star-half-alt')).toHaveLength(0);
    expect(wrapper.find('.far.fa-star')).toHaveLength(2);
  });
});


// test('snapshot', () => {
//   var state = {
//     stars: 4,
//     reviews: 400,
//     nightlyPrice: 50
//   }
//   const wrapper = renderer.create(<Header info={state} />);
//   console.log(wrapper.toJSON());
//   console.log(wrapper.toJSON().children);
//   console.log(wrapper.toJSON().children[0].children[0]);

//   // expect(wrapper.findAllByType('span')).toHaveLength(2);
//   expect(wrapper).toMatchSnapshot();
// });



// test('bot', () => {
//   const state = {
//     showPayment: true,
//     numNights: 3,
//     nightlyPrice: 50,
//     cleaningFee: 100,
//     serviceFee: 20,
//   }
//   const wrapper = shallow(<FormBot details={state}/>);
//   expect(wrapper.find('button').text()).toEqual('BOOK');
// });