import './textlogo.scss';

const TextLogo = () => {
    return <>
        <div className="logo-xl">
            <div className="">
                <span style={{
                    fontSize: '40px',
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    color: '#fff',
                    letterSpacing: '5px'
                }}>
                    Task
                </span>
                <span style={{
                    fontSize: '20px',
                    fontFamily: 'sans-serif',
                    fontWeight: '700',
                    color: '#fff',
                    marginLeft: '.5rem',
                    letterSpacing: '5px'
                }}>
                    Manager
                </span>
            </div>
        </div>
        <div className="logo-sm">
            <div className="">
                <span style={{
                    fontSize: '40px',
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    color: '#fff',
                    letterSpacing: '5px'
                }}>
                    T
                </span>
                <span style={{
                    fontSize: '20px',
                    fontFamily: 'sans-serif',
                    fontWeight: '700',
                    color: '#fff',
                    marginLeft: '.5rem',
                    letterSpacing: '5px'
                }}>
                    M
                </span>
            </div>
        </div>
    </>
}

export default TextLogo;