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
  open: jest.fn(() => Promise.resolve()),
}));

const uploadMock = jest.fn(() => Promise.resolve());
const metadataMock = jest.fn(() => Promise.resolve());
const removeMock = jest.fn(() => Promise.resolve());
const storeURLMock = jest.fn(() => Promise.resolve());
const retrieveMock = jest.fn(() => Promise.resolve());
const removeMetadataMock = jest.fn(() => Promise.resolve());
const previewMock = jest.fn(() => Promise.resolve());
const logoutMock = jest.fn(() => Promise.resolve());
const transformMock = jest.fn(() => Promise.resolve());

jest.spyOn(filestack, 'init').mockImplementation(() => ({
  picker: pickerMock,
  upload: uploadMock,
  metadata: metadataMock,
  remove: removeMock,
  storeURL: storeURLMock,
  retrieve: retrieveMock,
  removeMetadata: removeMetadataMock,
  preview: previewMock,
  logout: logoutMock,
  transform: transformMock,
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
      customRender: test,
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
      actionOptions: { wrong: 'handle' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run metadata and mock handle', () => {
    props = {
      action: 'metadata',
      actionOptions: { handle: 'handle' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(metadataMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should run remove width mock handle and security', () => {
    props = {
      action: 'remove',
      options: { handle: 'handle' },
      security: { policy: 'policy', signature: 'signature' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should run storeUrl with mock url', () => {
    props = {
      action: 'storeUrl',
      options: { url: 'url' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(storeURLMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should run retrieve with mock handle', () => {
    props = {
      action: 'retrieve',
      options: { handle: 'handle' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(retrieveMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should run transform with mock url', () => {
    props = {
      action: 'transform',
      options: { url: 'url' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(transformMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should throw an exception with transform and wrong options properties', () => {
    props = {
      action: 'transform',
      options: { handle: 'abc123', wrong: 'wrong' },
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should run upload with mock data', () => {
    props = {
      action: 'upload',
      options: { url: 'url' },
      file: new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' }),
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(uploadMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should create picker instance before click on the button (old preload option is now default behaviour)', () => {
    props = {
      componentDisplayMode: {
        type: 'button',
        customText: 'Pick file',
        customClass: 'filestack-react',
      },
    };
    wrapper = createWrapper(props);
    expect(pickerMock).toHaveBeenCalledTimes(1);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(pickerMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to run removeMetadata action', () => {
    props = {
      action: 'removeMetadata',
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(removeMetadataMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to run preview action', () => {
    props = {
      action: 'preview',
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(previewMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to run logout action', () => {
    props = {
      action: 'logout',
    };
    wrapper = createWrapper(props);
    wrapper.find('button').simulate('click', { stopPropagation () {}, preventDefault() {} });
    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });
});
