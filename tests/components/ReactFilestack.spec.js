import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as filestack from 'filestack-js';
import ReactFilestack from '../../src/ReactFilestack';

configure({ adapter: new Adapter() });

const test = () => <div>test</div>; // eslint-disable-line

console = {
  log: jest.fn(),
  error: jest.fn(),
};

const pickerMock = jest.fn(() => ({
  open: jest.fn(),
}));

jest.spyOn(filestack, 'init').mockImplementation(() => ({
  picker: pickerMock,
  upload: jest.fn(() => Promise.resolve()),
  metadata: jest.fn(() => Promise.resolve()),
  remove: jest.fn(() => Promise.resolve()),
  storeURL: jest.fn(() => Promise.resolve()),
  retrieve: jest.fn(() => Promise.resolve()),
}));

const createWrapper = (props = {}) => {
  props.apikey = 'Acu94EFL1STGYvkM6a8usz';
  return shallow(
    <ReactFilestack {...props} />,
  );
};

let props;
let wrapper;

describe('<ReactFilestack />', () => {
  afterEach(() => {
    pickerMock.mockClear();
  });

  it('should render ReactFilestack component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render the component', () => {
    props = {
      onSuccess: (result) => {
        console.log('result', result);
      },
      onError: (error) => {
        console.error('error', error);
      },
      render: test,
    };
    wrapper = createWrapper(props);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should run pick as default', () => {
    wrapper = createWrapper();
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should not allow wrong option properties', () => {
    props = {
      options: { wrong: 'handle' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run metadata and mock handle', () => {
    props = {
      mode: 'metadata',
      options: { handle: 'handle' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run remove width mock handle and security', () => {
    props = {
      mode: 'remove',
      options: { handle: 'handle' },
      security: { policy: 'policy', signature: 'signature' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run storeUrl with mock url', () => {
    props = {
      mode: 'storeUrl',
      options: { url: 'url' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run retrieve with mock handle', () => {
    props = {
      mode: 'retrieve',
      options: { handle: 'handle' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run transform with mock url', () => {
    props = {
      mode: 'transform',
      options: { url: 'url' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should throw an exception with transform and wrong options properties', () => {
    props = {
      mode: 'transform',
      options: { handle: 'abc123', wrong: 'wrong' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run upload with mock data', () => {
    props = {
      mode: 'upload',
      options: { url: 'url' },
      file: new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' }),
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should create picker instance before click on the button when preload true', () => {
    props = {
      preload: true,
    };
    wrapper = createWrapper(props);
    expect(pickerMock).toHaveBeenCalledTimes(1);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(pickerMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should create picker instance after click on the button when preload false(default)', () => {
    wrapper = createWrapper();
    expect(pickerMock).toHaveBeenCalledTimes(0);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(pickerMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });
});
