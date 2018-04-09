import App from './App';

it('Should render App', () => {
    const rootEle = document.createElement('div');
    rootEle.id = 'root';
    document.body.appendChild(rootEle);
    expect(typeof App).toBe('function');
});
