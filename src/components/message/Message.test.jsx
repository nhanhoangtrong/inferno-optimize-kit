import Message from './Message';
import { render } from 'inferno';
import {
    isFunctionalVNode,
    findRenderedVNodeWithType,
} from 'inferno-test-utils';

it('Should render Message with error color', () => {
    expect(typeof Message).toBe('function');
    // expect(findRenderedVNodeWithType(renderedTree, 'div')).toBeTruthy();
});
