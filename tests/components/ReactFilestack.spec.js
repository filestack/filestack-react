import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ReactFilestack from '../../src/ReactFilestack';

configure({ adapter: new Adapter() });

const test = () => <div>test</div> // eslint-disable-line

const apikey = 'Acu94EFL1STGYvkM6a8usz';

console = {
  log: jest.fn(),
  error: jest.fn(),
};

describe('<ReactFilestack />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ReactFilestack apikey={apikey} />,
    );
  });

  it('should render ReactFilestack component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render the component', () => {
    wrapper.setProps(
      {
        onSuccess: (result) => {
          console.log('result', result);
        },
        onError: (error) => {
          console.error('error', error);
        },
        render: test,
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should run pick as default', () => {
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should not allow wrong option properties', () => {
    wrapper.setProps({
      options: { wrong: 'handle' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run metadata and mock handle', () => {
    wrapper.setProps({
      mode: 'metadata',
      options: { handle: 'handle' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run remove width mock handle and security', () => {
    wrapper.setProps({
      mode: 'remove',
      options: { handle: 'handle' },
      security: { policy: 'policy', signature: 'signature' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run storeUrl with mock url', () => {
    wrapper.setProps({
      mode: 'storeUrl',
      options: { url: 'url' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run retrieve with mock handle', () => {
    wrapper.setProps({
      mode: 'retrieve',
      options: { handle: 'handle' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run transform with mock url', () => {
    wrapper.setProps({
      mode: 'transform',
      options: { url: 'url' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should throw an exception with transform and wrong options properties', () => {
    wrapper.setProps({
      mode: 'transform',
      options: { handle: 'abc123', wrong: 'wrong' },
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run upload with mock data', () => {
    wrapper.setProps({
      mode: 'upload',
      options: { url: 'url' },
      file: new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' }),
    });
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });
});
